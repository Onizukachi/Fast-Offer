# frozen_string_literal: true

module Api
  module V1
    class AnalyticsController < ApplicationController
      before_action :authenticate_user!

      def index
        position_id = params[:position_id] || Position.find_by(title: 'Ruby on Rails').id
        skills = Vacancy.skills_rated(position_id)
        employers = Employer.for_position(position_id)
        chart_data = VacancyManager::CountByMonth.call(position_id)

        render json: { skills:, employers:, chart_data: }, status: :ok
      end
    end
  end
end
