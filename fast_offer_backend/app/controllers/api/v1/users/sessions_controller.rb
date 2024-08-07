# frozen_string_literal: true

module Api
  module V1
    module Users
      class SessionsController < Devise::SessionsController
        include RackSessionFix

        respond_to :json

        private

        def respond_with(resource, _opts = {})
          render json: {
            status: { message: 'Logged in sucessfully.' },
            user: resource
          }, status: :ok
        end

        def respond_to_on_destroy
          header = request.headers['authorization'].split(' ')[1]
          key = Rails.application.credentials.devise_jwt_secret_key!
          jwt_payload = JWT.decode(header, key).first
          current_user = User.find(jwt_payload['sub'])
          log_out_success && return if current_user

          log_out_failure
        end

        def log_out_success
          render json: { message: 'You are logged out.' }, status: :ok
        end

        def log_out_failure
          render json: { message: 'logout failed !!' }, status: :unauthorized
        end
      end
    end
  end
end
