# frozen_string_literal: true

module Api
  module V1
    class TagsController < ApplicationController
      after_action :verify_authorized

      # GET /api/v1/tags
      def index
        authorize :tag

        render json: TagSerializer.new(ActsAsTaggableOn::Tag.all)
      end
    end
  end
end
