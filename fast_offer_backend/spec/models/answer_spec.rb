# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Answer, type: :model do
  describe 'associations' do
    it { should belong_to(:author).class_name('User') }
    it { should belong_to(:question) }
    it { should have_many(:comments) }
    it { should have_many(:likes) }
  end

  describe 'validations' do
    let(:question) { create(:question, :with_position) }

    subject { build(:answer, question:) }

    it { should validate_presence_of(:body) }
    it { should validate_uniqueness_of(:body).scoped_to(:question_id) }
  end
end
