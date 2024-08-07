# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  it { should define_enum_for(:role) }

  describe 'associations' do
    it { should have_many(:questions) }
    it { should have_many(:answers) }
    it { should have_many(:likes) }
  end

  describe 'validations' do
    subject { build(:user) }

    it { should validate_presence_of(:username) }
    it { should validate_uniqueness_of(:username) }
    it { should validate_length_of(:username).is_at_least(3) }
    it { should validate_presence_of(:password_confirmation) }
    it { should validate_confirmation_of(:password) }
  end
end
