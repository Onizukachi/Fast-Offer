# frozen_string_literal: true

class Vacancy < ApplicationRecord
  belongs_to :employer
  belongs_to :position

  validates :name, presence: true

  scope :hh, -> { where.not(hh_id: nil) }

  def self.skills_rated(position_id)
    skills = where(position_id:).pluck(:skills).flatten
    skills = skills.each_with_object(Hash.new(0)) { |skill, acc| acc[skill] += 1 }
    skills.sort_by(&:last).reverse
  end
end
