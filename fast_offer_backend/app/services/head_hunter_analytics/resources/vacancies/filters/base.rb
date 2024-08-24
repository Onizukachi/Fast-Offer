# frozen_string_literal: true

module HeadHunterAnalytics
  module Resources
    module Vacancies
      module Filters
        class Base
          KEYWORDS = %w[].freeze

          def self.call(data)
            return data if keywords.empty?

            data.keep_if { |item| item['name'].match?(/#{keywords.join('|')}/i) }
          end

          def self.keywords
            self::KEYWORDS
          end
        end
      end
    end
  end
end
