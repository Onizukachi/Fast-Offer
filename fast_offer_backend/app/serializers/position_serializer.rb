# frozen_string_literal: true

class PositionSerializer
  include JSONAPI::Serializer

  attributes :id, :title, :image_url

  has_one :analytic_log, serializer: :cron_analytics_log
end
