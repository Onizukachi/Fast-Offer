# frozen_string_literal: true

module LikedHelper
  extend ActiveSupport::Concern

  included do
    attribute :liked do |object, params|
      params[:current_user] ? object.likes.any? { |like| like.user_id == params[:current_user].id } : false
    end
  end
end
