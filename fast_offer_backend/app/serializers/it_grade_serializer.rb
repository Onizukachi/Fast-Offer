# frozen_string_literal: true

class ItGradeSerializer
  include JSONAPI::Serializer

  attributes :id, :grade
end
