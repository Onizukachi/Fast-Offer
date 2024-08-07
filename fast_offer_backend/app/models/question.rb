# frozen_string_literal: true

class Question < ApplicationRecord
  include Authorable
  include Likeable

  include ActionView::Helpers::SanitizeHelper

  acts_as_taggable_on :tags

  belongs_to :grade, class_name: 'ItGrade', foreign_key: 'it_grades_id'
  has_many :answers, dependent: :destroy
  has_many :position_questions, dependent: :destroy
  has_many :positions, through: :position_questions
  has_many :favorites, dependent: :destroy
  has_many :favorite_users, through: :favorites, source: :user

  validate :must_have_at_least_one_position
  validate :minimum_length
  validates :body, presence: true, uniqueness: true

  private

  def minimum_length
    errors.add(:body, :too_short, count: 6) if strip_tags(body).length < 6
  end

  def must_have_at_least_one_position
    return unless positions.empty?

    errors.add(:positions, 'должен быть указан, как минимум один')
  end
end
