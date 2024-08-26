# frozen_string_literal: true

require_relative 'errors/error'
require_relative 'errors/bad_request'
require_relative 'errors/unauthorized'
require_relative 'errors/captcha_required'
require_relative 'errors/internal_server_error'
require_relative 'errors/not_found'
require_relative 'errors/too_many_requests'
require_relative 'errors/unprocessable_entity'

module HeadHunterApi
  class ResponseHandler
    ERROR_MAP = {
      400 => Errors::BadRequest,
      401 => Errors::Unauthorized,
      403 => Errors::CaptchaRequired,
      404 => Errors::NotFound,
      429 => Errors::TooManyRequests,
      422 => Errors::UnprocessableEntity,
      500 => Errors::InternalServerError
    }.freeze

    def handle(response)
      raise error(response), response.body['description'] unless response.success?

      response
    end

    private

    def error(response)
      ERROR_MAP[Integer(response.status)] || Error
    end
  end
end
