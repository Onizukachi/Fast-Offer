# frozen_string_literal: true

class PositionQuestion < ApplicationRecord
  belongs_to :position
  belongs_to :question

  validates_uniqueness_of :position_id, scope: :question_id
end
