# frozen_string_literal: true

FactoryBot.define do
  factory :vacancy do
    employer
    position
    name { Faker::Lorem.sentence(word_count: 5) }
    published_at { Faker::Time.between(from: DateTime.now - 30, to: DateTime.now) }
  end
end
