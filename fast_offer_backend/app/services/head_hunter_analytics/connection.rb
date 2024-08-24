# frozen_string_literal: true

require 'faraday'

module HeadHunterAnalytics
  module Connection
    def connection
      @connection ||= Faraday.new do |conn|
        conn.url_prefix = HeadHunterAnalytics.configuration.base_url
        conn.ssl.verify = false
        conn.request :json
        conn.response :json, content_type: 'application/json'
        conn.adapter HeadHunterAnalytics.configuration.adapter || Faraday.default_adapter
      end
    end
  end
end
