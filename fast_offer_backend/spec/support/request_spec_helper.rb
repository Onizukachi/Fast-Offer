# frozen_string_literal: true

module RequestSpecHelper
  def json
    JSON.parse(response.body)
  end

  def authenticated_header(user)
    headers = { 'ACCEPT' => 'application/json' }
    Devise::JWT::TestHelpers.auth_headers(headers, user)
  end
end
