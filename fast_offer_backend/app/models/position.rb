# frozen_string_literal: true

class Position < ApplicationRecord
  has_one_attached :image
  has_many :position_questions, dependent: :destroy
  has_many :questions, through: :position_questions

  validates :title, presence: true, uniqueness: { case_sensitive: false }

  default_scope { order(:title) }

  def image_url
    Rails.application.routes.url_helpers.url_for(image) if image.attached?
  end
end
