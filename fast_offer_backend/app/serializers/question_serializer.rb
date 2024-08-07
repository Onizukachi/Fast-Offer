# frozen_string_literal: true

class QuestionSerializer
  include JSONAPI::Serializer
  include LikedHelper

  attributes :id, :body, :views_count, :likes_count, :answers_count

  attribute :is_favorite do |object, params|
    if params[:current_user]
      object.favorites.any? { |favorite| favorite.user_id == params[:current_user].id }
    else
      false
    end
  end

  belongs_to :author, id_method_name: :user_id, serializer: :user
  belongs_to :grade, id_method_name: :it_grades_id, serializer: :it_grade
  has_many :positions
  has_many :tags
  has_many :answers
end
