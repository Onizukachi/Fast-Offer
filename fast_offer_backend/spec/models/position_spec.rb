# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Position, type: :model do
  describe 'associations' do
    it { should have_many(:questions) }
    it { should have_one(:analytic_log) }
    it { should have_one_attached(:image) }
  end

  describe 'validations' do
    subject { build(:position) }

    it { should validate_presence_of(:title) }
    it { should validate_uniqueness_of(:title).ignoring_case_sensitivity }
  end
end
