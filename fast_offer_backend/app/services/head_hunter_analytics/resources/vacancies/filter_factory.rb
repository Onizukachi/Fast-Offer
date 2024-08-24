# frozen_string_literal: true

Dir[File.join(__dir__, 'filters', '*.rb')].each { |file| require_relative file }

module HeadHunterAnalytics
  module Resources
    module Vacancies
      class FilterFactory
        FACTORY_MATCHING = {
          'Ruby on Rails' => Filters::Ruby,
          '1C' => Filters::OneC,
          'Angular' => Filters::Angular,
          'C#' => Filters::Sharp,
          'DevOps' => Filters::Devops,
          'Go' => Filters::Go,
          'Java' => Filters::Java,
          'Node.js' => Filters::NodeJs,
          'PHP' => Filters::Php,
          'Python' => Filters::Python,
          'React' => Filters::React,
          'Swift' => Filters::Swift,
          'Vue' => Filters::Vue
        }.freeze

        def self.create_filter(language)
          FACTORY_MATCHING[language] || Filters::Base
        end
      end
    end
  end
end
