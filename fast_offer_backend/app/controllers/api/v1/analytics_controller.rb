# frozen_string_literal: true

module Api
  module V1
    class AnalyticsController < ApplicationController
      before_action :authenticate_user!

      def index
        skills = Vacancy.skills_rated(params[:position_id] || 77)
        employers = Employer.for_position(params[:position_id] || 77)
        chart_data = VacancyManager::CountByMonth.call(params[:position_id] || 77)

        render json: { skills:, employers:, chart_data: }, status: :ok
      end
    end
  end
end
