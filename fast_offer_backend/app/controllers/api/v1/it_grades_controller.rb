# frozen_string_literal: true

module Api
  module V1
    class ItGradesController < ApplicationController
      # GET /api/v1/it_grades

      def index
        render json: ItGradeSerializer.new(ItGrade.all)
      end
    end
  end
end
