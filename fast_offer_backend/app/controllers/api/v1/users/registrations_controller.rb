# frozen_string_literal: true

module Api
  module V1
    module Users
      class RegistrationsController < Devise::RegistrationsController
        include RackSessionFix
        respond_to :json

        private

        # @param resource [User]
        def respond_with(resource, **)
          render_post_success and return if request.method == 'POST' && resource.persisted?
          render_delete_success and return if request.method == 'DELETE'

          render_failure
        end

        def render_post_success
          render json: { status: { message: 'Signed up sucessfully.' }, user: resource }, status: :ok
        end

        def render_delete_success
          render json: {
            status: { message: 'Account deleted successfully.' }
          }, status: :ok
        end

        def render_failure
          render json: {
            status: { message: "User couldn't be created successfully.",
                      errors: resource.errors
            }
          }, status: :unprocessable_entity
        end
      end
    end
  end
end

