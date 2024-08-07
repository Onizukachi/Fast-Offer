# frozen_string_literal: true

class UserSerializer
  include JSONAPI::Serializer

  attributes :id, :email, :nickname, :role, :is_banned, :gravatar_hash
end
