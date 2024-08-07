# frozen_string_literal: true

class Comment < ApplicationRecord
  include Authorable
  include Likeable

  has_ancestry

  belongs_to :commentable, polymorphic: true

  validates :body, presence: true, length: { minimum: 3 }
end
