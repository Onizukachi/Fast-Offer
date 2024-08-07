# frozen_string_literal: true

class LikeSerializer
  include JSONAPI::Serializer

  attributes :likeable_type, :likeable_id

  belongs_to :author, id_method_name: :user_id, serializer: :user
end
