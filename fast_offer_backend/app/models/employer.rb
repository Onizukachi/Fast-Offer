# frozen_string_literal: true

class Employer < ApplicationRecord
  has_many :vacancies

  validates :name, presence: true, uniqueness: true

  scope :for_position, ->(position_id) { includes(:vacancies).where(vacancies: { position_id: }) }
end
