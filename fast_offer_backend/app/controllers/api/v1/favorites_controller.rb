# frozen_string_literal: true

module Api
  module V1
    class FavoritesController < ApplicationController
      include CursorMetaParamsHandler

      before_action :authenticate_user!, except: %i[index]
      after_action :verify_authorized

      # GET /api/v1/favorites
      def index
        authorize Favorite
        @page = current_user.favorite_questions.cursor_paginate(**cursor_meta_params).fetch

        render json: QuestionSerializer.new(@page.records, index_serializer_options)
      end

      # POST /api/v1/favorites
      def create
        favorite = current_user.favorites.build(question_id: params[:question_id])
        authorize favorite

        if favorite.save
          render json: favorite, status: :created
        else
          render json: favorite.errors.messages, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/favorites/unfavorite
      def unfavorite
        favorite = current_user.favorites.find_by!(question_id: params[:question_id])
        authorize favorite

        favorite.destroy

        head :no_content
      end

      private

      def index_serializer_options
        {
          include: %i[author positions tags grade],
          params: { current_user: current_user },
          meta: { has_next: @page.has_next?, next_cursor: @page.next_cursor }
        }
      end
    end
  end
end
