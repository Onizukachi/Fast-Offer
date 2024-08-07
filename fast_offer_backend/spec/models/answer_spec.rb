# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Answer, type: :model do
  describe 'associations' do
    it { should belong_to(:author).class_name('User') }
    it { should have_many(:comments) }
    it { should have_many(:likes) }
  end

  describe 'validations' do
    subject { build(:answer) }

    it { should validate_presence_of(:body) }
    it { should validate_uniqueness_of(:body) }
    it { should validate_length_of(:body).is_at_least(5) }
  end
end
