# frozen_string_literal: true

FactoryBot.define do
  factory :it_grade, aliases: [:grade] do
    traits_for_enum :grade
  end
end
