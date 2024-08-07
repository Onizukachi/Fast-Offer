# frozen_string_literal: true

module Filters
  module Questions
    class IndexFilter < Filters::BaseFilter
      ORDER = %w[desc asc].freeze

      FILTERS = {
        query_filter: {
          apply?: ->(params) {
            params[:query].is_a?(String) && params[:query].present?
          },
          apply: ->(scope, params) {
            scope.where('questions.body ILIKE ?', "%#{ActiveRecord::Base.sanitize_sql_like(params[:query])}%")
          }
        }.freeze,
        grade_filter: {
          apply?: ->(params) {
            params[:grade_id].present?
          },
          apply: ->(scope, params) {
            scope.where(it_grades_id: params[:grade_id])
          }
        }.freeze,
        positions_filter: {
          apply?: ->(params) {
            params[:position_ids].is_a?(Array) && params[:position_ids].present?
          },
          apply: ->(scope, params) {
            scope.where(positions: { id: params[:position_ids] })
          }
        }.freeze,
        tag_filter: {
          apply?: ->(params) {
            params[:tag].present?
          },
          apply: ->(scope, params) {
            scope.tagged_with((params[:tag]))
          }
        }.freeze
      }.freeze

      def self.filters
        FILTERS
      end
    end
  end
end
