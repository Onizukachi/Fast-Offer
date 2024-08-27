# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Like, type: :model do
  describe 'associations' do
    it { should belong_to(:user) }
    it { should belong_to(:likeable) }
  end

  describe 'validations' do
    let(:user) { create(:user) }
    let(:likeable) { create(:question, :with_position) }

    subject { build(:like, user:, likeable:) }

    it { should validate_uniqueness_of(:user_id).scoped_to(:likeable_id, :likeable_type) }
  end
end
