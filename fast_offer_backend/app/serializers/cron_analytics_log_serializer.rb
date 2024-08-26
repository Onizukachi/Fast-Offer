# frozen_string_literal: true

class CronAnalyticsLogSerializer
  include JSONAPI::Serializer

  attributes :id, :updated_at, :vacancies_processed
end
