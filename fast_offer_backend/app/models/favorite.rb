# frozen_string_literal: true

class Favorite < ApplicationRecord
  belongs_to :user
  belongs_to :question

  validates :user_id, uniqueness: { scope: :question_id }
end
