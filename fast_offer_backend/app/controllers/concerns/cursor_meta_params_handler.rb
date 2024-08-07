# frozen_string_literal: true

module CursorMetaParamsHandler
  extend ActiveSupport::Concern

  included do
    private

    def cursor_meta_params
      meta_params = {}
      meta_params.merge!(after: params[:after]) if params[:after].present?
      meta_params.merge!(limit: params[:limit].to_i) if params[:limit].present?

      if params[:sort].present? && params[:order].present?
        meta_params.merge!(order: { params[:sort] => params[:order] })
      end

      meta_params
    end
  end
end
