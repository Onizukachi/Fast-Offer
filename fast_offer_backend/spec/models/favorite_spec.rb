# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Favorite, type: :model do
  describe 'associations' do
    it { should belong_to(:user) }
    it { should belong_to(:question) }
  end

  describe 'validations' do
    let(:user) { create(:user) }
    let(:question) { create(:question, :with_position) }

    subject { build(:favorite, user:, question:) }

    it { should validate_uniqueness_of(:user_id).scoped_to(:question_id) }
  end
end
