# frozen_string_literal: true

module ExceptionHandler
  extend ActiveSupport::Concern

  included do
    rescue_from ActiveRecord::RecordNotFound do |e|
      render json: { error: e.message }, status: :not_found
    end
    rescue_from ActiveRecord::RecordInvalid do |e|
      render json: { error: e.message }, status: :unprocessable_entity
    end
    rescue_from ActiveRecord::RecordNotDestroyed do |e|
      render json: { errors: e.record.errors }, status: :unprocessable_entity
    end
    rescue_from Pundit::NotAuthorizedError do |_|
      render json: { error: 'You are not authorized to perform this action.' }, status: :unauthorized
    end
  end
end
