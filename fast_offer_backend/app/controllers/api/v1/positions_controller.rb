# frozen_string_literal: true

module Api
  module V1
    class PositionsController < ApplicationController
      before_action :authenticate_user!, only: %i[create update destroy]
      before_action :set_position, only: %i[update destroy]
      before_action :authorize_position!
      after_action :verify_authorized

      # GET /api/v1/positions
      def index
        render json: PositionSerializer.new(Position.all)
      end

      # POST /api/v1/positions
      def create
        @position = Position.new(position_params)

        if @position.save
          render json: @position, status: :created
        else
          render json: @position.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /api/v1/positions/:id
      def update
        if @position.update(question_params)
          render json: @position
        else
          render json: @position.errors, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/positions/:id
      def destroy
        @position.destroy
      end

      private

      def set_position
        @position = Question.find params[:id]
      end

      def position_params
        params.require(:position).permit(:title)
      end

      def authorize_position!
        authorize(@position || Position)
      end
    end
  end
end
