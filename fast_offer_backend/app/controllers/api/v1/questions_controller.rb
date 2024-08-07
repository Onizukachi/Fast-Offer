# frozen_string_literal: true

module Api
  module V1
    class QuestionsController < ApplicationController
      include CursorMetaParamsHandler
      before_action :authenticate_user!, except: %i[index show]
      before_action :set_question, except: %i[index create]
      before_action :authorize_question!
      after_action :verify_authorized

      # GET /api/v1/questions
      def index
        filter_questions
        fetch_page

        render json: QuestionSerializer.new(@page.records, index_serializer_options)
      end

      # GET /api/v1/questions/:id
      def show
        @question.increment!(:views_count)

        render json: QuestionSerializer.new(@question, show_serializer_options)
      end

      # POST /api/v1/questions
      def create
        @question = current_user.questions.build(question_params)

        if @question.save
          render json: @question, status: :created
        else
          render json: @question.errors.messages, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /api/v1/questions/:id
      def update
        if @question.update(question_params)
          render json: @question
        else
          render json: @question.errors.messages, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/questions/:id
      def destroy
        @question.destroy
      end

      private

      def fetch_page
        @page = @questions.cursor_paginate(**cursor_meta_params).fetch
      end

      def filter_questions
        questions = Question.includes(:author, :positions, :tags, :likes, :answers, :grade, :favorites)
        @questions = ::Filters::Questions::IndexFilter.call(questions, params)
      end

      def index_serializer_options
        {
          include: %i[author positions tags grade],
          params: { current_user: current_user },
          meta: { has_next: @page.has_next?, next_cursor: @page.next_cursor }
        }
      end

      def show_serializer_options
        {
          include: %i[author positions tags answers answers.author grade],
          params: { current_user: current_user }
        }
      end

      def set_question
        @question = Question.preload(:author,
                                     :positions,
                                     :tags,
                                     :likes,
                                     :favorites,
                                     answers: %i[author comments])
                            .find params[:id]
      end

      def question_params
        params.require(:question)
              .permit(:body, :it_grades_id, tag_list: [], position_ids: [])
              .merge(author: current_user)
      end

      def authorize_question!
        authorize(@question || Question)
      end
    end
  end
end
