# frozen_string_literal: true

require 'active_support/core_ext/array/extract_options'
require_relative 'errors/captcha_required'
require_relative 'errors/too_many_requests'

module HeadHunterAnalytics
  module Retryable
    # These errors will be handled automatically
    DEFAULT_ERROR_CLASSES = [
      HeadHunterAnalytics::Errors::CaptchaRequired,
      HeadHunterAnalytics::Errors::TooManyRequests
    ].freeze

    # rubocop:disable Metrics/MethodLength
    # rubocop:disable Metrics/AbcSize
    def with_retries(*args)
      options = args.extract_options!
      exceptions = args

      options[:max_retry] ||= HeadHunterAnalytics.configuration.max_retry
      options[:sleep_time] ||= HeadHunterAnalytics.configuration.request_sleep_time
      options[:sleep_multiplier] ||= HeadHunterAnalytics.configuration.sleep_multiplier
      exceptions = DEFAULT_ERROR_CLASSES if exceptions.empty?

      retried = 0
      begin
        yield
      rescue *exceptions => e
        if retried >= options[:max_retry]
          Rails.logger.error "Retryable failed after #{retried} attempts, exception: #{e}"
          raise e
        end

        retried += 1
        sleep(options[:sleep_time])
        options[:sleep_time] *= options[:sleep_multiplier]
        Rails.logger.info "Retry #{retried}  #{e.class}: #{e.message}"
        retry
      end
    end
    # rubocop:enable Metrics/MethodLength
    # rubocop:enable Metrics/AbcSize
  end
end
