# frozen_string_literal: true

class CommentPolicy < ApplicationPolicy
  def update?
    user.author?(record) || user.admin_role? || user.moderator_role?
  end

  def create?
    true
  end

  def destroy?
    user.author?(record) || user.admin_role? || user.moderator_role?
  end
end
