# frozen_string_literal: true

require 'faraday'

module HeadHunterApi
  module Connection
    def connection
      @connection ||= Faraday.new do |conn|
        conn.url_prefix = HeadHunterApi.configuration.base_url
        conn.ssl.verify = false
        conn.request :json
        conn.response :json, content_type: 'application/json'
        conn.adapter HeadHunterApi.configuration.adapter || Faraday.default_adapter
      end
    end
  end
end
