# frozen_string_literal: true

class UpdateAnalyticsJob
  include Sidekiq::Job
  sidekiq_options retry: false

  def perform(last_days = nil)
    client = HeadHunterAnalytics::Client.new

    Position.find_each do |position|
      ids = []

      begin
        first_response = client.vacancies.list(text: position.title, last_days:)
        ids.push(*extract_ids(first_response.items))

        (1..([first_response.pages, 20].min)).each_with_object(ids) do |page, arr|
          sleep 0.3

          response = client.vacancies.list(text: position.title, page:, last_days:)
          arr.push(*extract_ids(response.items))
        end

      rescue => e
        Rails.logger.error "#{e.class} - #{e.message}"
      end

      existing_hh_ids = Vacancy.hh.pluck(:hh_id)

      ids.reject! { |id| existing_hh_ids.include?(id.to_i) }

      ids.uniq.each do |vacancy_id|
        sleep 0.3

        begin
          vacancy = client.vacancies.show(vacancy_id)
        rescue HeadHunterAnalytics::Errors::NotFound
          next
        end

        employer = Employer.find_or_create_by(name: vacancy.employer) if vacancy.employer

        Vacancy.create(
          hh_id: vacancy_id,
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
    end
  end

  private

  def extract_ids(data)
    data.map { |item| item['id'] }
  end
end
