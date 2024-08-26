# frozen_string_literal: true

class CronAnalyticsLog < ApplicationRecord
  belongs_to :position

  validates_uniqueness_of :position_id
end
