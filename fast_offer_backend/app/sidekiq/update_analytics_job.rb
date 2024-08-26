# frozen_string_literal: true

class UpdateAnalyticsJob
  include Sidekiq::Job
  sidekiq_options retry: false

  def perform(last_days = nil)
    Position.find_each do |position|
      Analytics::UpdateHeadHunter.call(position, last_days)
    end
  end
end
