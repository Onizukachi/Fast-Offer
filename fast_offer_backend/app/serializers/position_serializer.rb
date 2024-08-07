# frozen_string_literal: true

class PositionSerializer
  include JSONAPI::Serializer

  attributes :id, :title, :image_url
end
