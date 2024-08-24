# frozen_string_literal: true

module Api
  module V1
    class AnalyticsController < ApplicationController
      before_action :authenticate_user!

      def index
        skills = Vacancy.skills_rated(77)
        employers = Employer.for_position(77)

        render json: { skills:, employers: }, status: :ok
      end
    end
  end
end
