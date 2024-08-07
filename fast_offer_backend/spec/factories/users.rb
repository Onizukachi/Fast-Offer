# frozen_string_literal: true

FactoryBot.define do
  factory :user, aliases: [:author] do
    sequence(:username) { |n| "#{Faker::Name.first_name}#{n}}" }
    email { Faker::Internet.email }
    password { 'TestPassword333!' }
    password_confirmation { 'TestPassword333!' }
    traits_for_enum :role
  end
end
