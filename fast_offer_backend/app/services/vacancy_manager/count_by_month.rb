# frozen_string_literal: true

module VacancyManager
  class CountByMonth < ApplicationService
    attr_reader :message

    # rubocop:disable Lint/MissingSuper
    def initialize(position_id, months_ago = 6)
      @position_id = position_id
      @months_ago = months_ago
    end
    # rubocop:enable Lint/MissingSuper

    def call
      result = init_state
      vacancies_count_query.each { |date, count| result[date.strftime('%Y-%m')] = count }

      result.transform_keys!(&method(:format_date))
    end

    private

    def vacancies_count_query
      Vacancy.where(position_id: @position_id,
                    published_at: @months_ago.months.ago.beginning_of_month..Date.today.end_of_month)
             .group(Arel.sql("DATE_TRUNC('month', published_at)"))
             .order(Arel.sql("DATE_TRUNC('month', published_at)"))
             .count
    end

    def last_months
      (0..@months_ago).map do |i|
        (Date.today.beginning_of_month - i.months).strftime('%Y-%m')
      end.reverse
    end

    def init_state
      last_months.each_with_object({}) { |month, hash| hash[month] = 0 }
    end

    def ru_months
      %w[Январь Февраль Март Апрель Май Июнь Июль Август Сентябрь Октябрь Ноябрь Декабрь]
    end

    def format_date(str)
      year, month = str.split('-').map(&:to_i)
      result = []

      result << ru_months[month - 1]
      result << ", #{year}" if year != Date.current.year

      result.join('')
    end
  end
end
