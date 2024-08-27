# frozen_string_literal: true

FactoryBot.define do
  factory :position do
    title { Faker::ProgrammingLanguage.name }
  end
end
