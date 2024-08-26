# frozen_string_literal: true

module HeadHunterApi
  module Resources
    module Vacancies
      # Build object vacancy from raw hash
      class VacancyBuilder
        class << self
          def build(hash)
            OpenStruct.new(
              id: hash['id'],
              name: hash['name'],
              email: hash.dig('contacts', 'email'),
              location: hash.dig('area', 'name'),
              salary_from: hash.dig('salary', 'from'),
              salary_to: hash.dig('salary', 'to'),
              salary_currency: hash.dig('salary', 'currency'),
              published_at: format_date(hash['published_at']),
              employer: hash.dig('employer', 'name'),
              key_skills: extract_skills(hash['key_skills'])
            )
          end

          private

          def format_date(date)
            DateTime.parse(date)
          end

          def extract_skills(skills)
            return [] unless skills

            skills.map { |skill| skill['name'] }
          end
        end
      end
    end
  end
end
