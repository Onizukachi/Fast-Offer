# frozen_string_literal: true

FactoryBot.define do
  factory :comment do
    body { Faker::Lorem.paragraph }
    author
    for_answer

    trait :for_answer do
      association :commentable, factory: :answer
    end
  end
end
