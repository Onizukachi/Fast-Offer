# frozen_string_literal: true

class LikesCountQuery
  attr_reader :likeable_relation

  def initialize(likeable_relation)
    @likeable_relation = likeable_relation
  end

  # @param likeable_entity [Question, Comment]
  # @return [Integer] count of likes or zero if nothing found
  def [](likeable_entity)
    counts[[likeable_entity.class.to_s, likeable_entity.id]] || 0
  end

  private

  # @return [Array<Hash>] contains hash of models name and models id with value like count
  def counts
    @counts ||= Like.where(likeable: likeable_relation).group(:likeable_type, :likeable_id).count
  end
end
