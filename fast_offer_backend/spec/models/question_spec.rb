# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Question, type: :model do
  describe 'associations' do
    it { should belong_to(:author).class_name('User') }
    it { should belong_to(:grade).class_name('ItGrade') }
    it { should have_many(:answers) }
    it { should have_many(:positions) }
    it { should have_many(:likes) }
    it { should have_many(:tags) }
  end

  describe 'validations' do
    subject { build(:question, :with_position) }

    it { should validate_presence_of(:body) }
    it { should validate_uniqueness_of(:body) }
    it { should validate_length_of(:body).is_at_least(6) }

    it 'is not valid without at least one position' do
      subject.positions = []
      expect(subject).to_not be_valid
    end
  end
end
