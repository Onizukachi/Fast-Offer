# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Vacancy, type: :model do
  describe 'associations' do
    it { should belong_to(:employer) }
    it { should belong_to(:position) }
  end

  describe 'validations' do
    subject { build(:vacancy) }

    it { should validate_presence_of(:name) }
    it { should validate_uniqueness_of(:hh_id) }
  end

  describe '.skills_rated' do
    let!(:position) { create(:position) }

    before do
      create(:vacancy, position:, skills: %w[Ruby Git Docker])
      create(:vacancy, position:, skills: %w[Ruby Git Docker])
      create(:vacancy, position:, skills: %w[Python Git])
      create(:vacancy, position:, skills: %w[Git Docker])
    end

    it 'returns skills rated by count in descending order' do
      result = described_class.skills_rated(position.id)

      expect(result).to eq([['Git', 4], ['Docker', 3], ['Ruby', 2], ['Python', 1]])
    end
  end
end
