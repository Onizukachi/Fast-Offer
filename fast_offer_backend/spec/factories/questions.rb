# frozen_string_literal: true

FactoryBot.define do
  factory :question do
    body { Faker::Lorem.question(word_count: 10) }
    author
    grade

    trait :with_position do
      after(:build) do |question|
        question.positions << FactoryBot.build(:position)
      end
    end
  end
end
