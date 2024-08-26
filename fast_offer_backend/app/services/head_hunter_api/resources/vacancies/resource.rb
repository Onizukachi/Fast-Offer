# frozen_string_literal: true

require 'active_support/core_ext/array/extract_options'
require_relative 'filter_factory'
require_relative 'vacancy_builder'

module HeadHunterApi
  module Resources
    module Vacancies
      # Exposes the operations available for a collection of vacancies
      #
      # @see { HeadHunterApi::Client.vacancies }
      class Resource < HeadHunterApi::Resources::Base
        # rubocop:disable Metrics/AbcSize
        def list(params = {})
          params = params.dup

          params[:text] ||= ''
          params[:page] ||= 0
          params[:per_page] ||= 100
          params[:date_from] = (Date.today - params[:last_days]).iso8601 if params[:last_days]
          filter = params[:filter] || FilterFactory.create_filter(params[:text])

          response = client.get(make_path('vacancies'), params)
          OpenStruct.new(items: filter.call(response.body['items']), pages: response.body['pages'])
        end
        # rubocop:enable Metrics/AbcSize

        def show(id)
          response = client.get(make_path("vacancies/#{id}"))

          VacancyBuilder.build(response.body)
        end
      end
    end
  end
end
