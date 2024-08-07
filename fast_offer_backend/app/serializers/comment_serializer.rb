# frozen_string_literal: true

class CommentSerializer
  def self.call(comment, current_user)
    comment.subtree.arrange_serializable(order: :created_at) do |parent, children|
      {
        id: parent.id,
        body: parent.body,
        created_at: parent.created_at,
        likes_count: parent.likes_count,
        liked: parent.likes.any? { |like| like.user_id == current_user&.id },
        author: UserSerializer.new(parent.author).serializable_hash,
        children:
      }
    end
  end
end
