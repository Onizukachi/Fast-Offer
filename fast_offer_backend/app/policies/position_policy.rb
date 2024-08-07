# frozen_string_literal: true

class PositionPolicy < ApplicationPolicy
  def update?
    create?
  end

  def create?
    user.admin_role?
  end

  def destroy?
    create?
  end
end
