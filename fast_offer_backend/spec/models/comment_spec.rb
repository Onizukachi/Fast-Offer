# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Comment, type: :model do
  describe 'associations' do
    it { should belong_to(:author).class_name('User') }
    it { should belong_to(:commentable) }
  end

  describe 'validations' do
    subject { build(:comment) }

    it { should validate_presence_of(:body) }
    it { should validate_length_of(:body).is_at_least(3) }
  end
end
