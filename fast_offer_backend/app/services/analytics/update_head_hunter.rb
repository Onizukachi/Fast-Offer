# frozen_string_literal: true

module Analytics
  class UpdateHeadHunter < ApplicationService
    attr_reader :position, :last_days

    SLEEP_TIME = 0.3

    # rubocop:disable Lint/MissingSuper
    def initialize(position, last_days = nil)
      @position = position
      @last_days = last_days
    end
    # rubocop:enable Lint/MissingSuper

    def call
      ids = collect_ids.uniq
      ids.reject { |id| existing_hh_ids.include?(id.to_i) }.each do |vacancy_id|
        sleep SLEEP_TIME

        begin
          vacancy = client.vacancies.show(vacancy_id)
        rescue HeadHunterApi::Errors::NotFound
          next
        end

        create_vacancy(vacancy)
      end

      mark_success_run(position.id, ids.size)
    end

    private

    def client
      @client ||= HeadHunterApi::Client.new
    end

    def create_vacancy(vacancy)
      employer = Employer.find_or_create_by(name: vacancy.employer) if vacancy.employer

      Vacancy.create(
        hh_id: vacancy.id,
        position_id: position.id,
        employer_id: employer.id,
        name: vacancy.name,
        email: vacancy.email,
        location: vacancy.location,
        salary_from: vacancy.salary_from,
        salary_to: vacancy.salary_to,
        salary_currency: vacancy.currency,
        published_at: vacancy.published_at,
        skills: vacancy.key_skills
      )
    end

    def collect_ids
      ids = []

      first_response = client.vacancies.list(text: position.title, last_days:)
      ids.concat(extract_ids(first_response.items))

      (1..[first_response.pages, 19].min).each do |page|
        sleep SLEEP_TIME
        response = client.vacancies.list(text: position.title, page:, last_days:)
        ids.concat(extract_ids(response.items))
      end

      ids
    rescue StandardError => e
      Rails.logger.error "#{e.class} - #{e.message}"
      ids
    end

    def existing_hh_ids
      @existing_hh_ids ||= Vacancy.hh.pluck(:hh_id)
    end

    def mark_success_run(position_id, vacancies_processed)
      log = CronAnalyticsLog.find_or_initialize_by(position_id:)

      log.vacancies_processed = vacancies_processed
      log.updated_at = Time.current
      log.save!
    end

    def extract_ids(data)
      data.map { |item| item['id'] }
    end
  end
end
