# frozen_string_literal: true

FactoryBot.define do
  factory :question do
    body { Faker::Lorem.question(word_count: 5) }
    author
    grade
  end
end
