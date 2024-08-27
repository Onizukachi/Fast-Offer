# frozen_string_literal: true

FactoryBot.define do
  factory :employer do
    name { Faker::Name.name }
    url { Faker::Internet.url }
  end
end
