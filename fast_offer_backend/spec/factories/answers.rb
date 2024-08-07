# frozen_string_literal: true

FactoryBot.define do
  factory :answer do
    body { Faker::Lorem.paragraph_by_chars }
    author
    question
  end
end
