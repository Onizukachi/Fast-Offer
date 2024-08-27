# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Employer, type: :model do
  describe 'associations' do
    it { should have_many(:vacancies) }
  end

  describe 'validations' do
    subject { build(:employer) }

    it { should validate_presence_of(:name) }
    it { should validate_uniqueness_of(:name) }
  end
end
