# frozen_string_literal: true

module HeadHunterApi
  module Resources
    class Base
      attr_accessor :client

      def initialize(client)
        @client = client
      end

      private

      def make_path(resource_path)
        path = if !resource_path.start_with?('/') && !HeadHunterApi.configuration.base_url.end_with?('/')
                 "/#{resource_path}"
               else
                 resource_path
               end

        "#{HeadHunterApi.configuration.base_url}#{path}"
      end
    end
  end
end
