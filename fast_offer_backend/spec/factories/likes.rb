# frozen_string_literal: true

FactoryBot.define do
  factory :like do
    user
    for_question

    trait :for_question do
      association :likeable, factory: :question
    end

    trait :for_answer do
      association :likeable, factory: :answer
    end
  end
end
