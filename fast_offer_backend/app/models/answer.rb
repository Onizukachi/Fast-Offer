# frozen_string_literal: true

class Answer < ApplicationRecord
  include Commentable
  include Authorable
  include Likeable

  include ActionView::Helpers::SanitizeHelper

  default_scope { order(created_at: :desc) }

  belongs_to :question, counter_cache: true

  validate :minimum_length
  validates :body, uniqueness: true, presence: true

  private

  def minimum_length
    errors.add(:body, :too_short, count: 6) if strip_tags(body).length < 6
  end
end
