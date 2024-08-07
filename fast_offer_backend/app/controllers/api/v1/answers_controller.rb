# frozen_string_literal: true

module Api
  module V1
    class AnswersController < ApplicationController
      before_action :authenticate_user!
      before_action :set_question!
      before_action :set_answer!, only: %i[update destroy]
      before_action :authorize_answer!
      after_action :verify_authorized

      # POST /api/v1/questions/:question_id/answers
      def create
        answer = @question.answers.build answer_params
        options = {
          include: %i[author],
          params: { current_user: current_user }
        }

        if answer.save
          render json: AnswerSerializer.new(answer, options), status: :created
        else
          render json: answer.errors.full_messages, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /api/v1/questions/:question_id/answers/:id
      def update
        if @answer.update(answer_params)
          render json: AnswerSerializer.new(answer, options), status: :ok
        else
          render json: @answer.errors.full_messages, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/questions/:question_id/answers/:id
      def destroy
        @answer.destroy

        head :no_content
      end

      private

      def set_question!
        @question = Question.find params[:question_id]
      end

      def set_answer!
        @answer = @question.answers.find params[:id]
      end

      def answer_params
        params.require(:answer).permit(:body).merge(author: current_user)
      end

      def authorize_answer!
        authorize(@answer || Answer)
      end
    end
  end
end
