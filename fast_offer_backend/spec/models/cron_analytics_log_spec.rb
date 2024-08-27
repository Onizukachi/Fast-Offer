# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CronAnalyticsLog, type: :model do
  describe 'associations' do
    it { should belong_to(:position) }
  end

  describe 'validations' do
    let(:position) { create(:position) }
    subject { build(:cron_analytics_log, position:) }

    it { should validate_uniqueness_of(:position_id) }
  end
end
