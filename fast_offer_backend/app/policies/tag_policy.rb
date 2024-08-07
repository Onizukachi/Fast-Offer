# frozen_string_literal: true

class TagPolicy
  attr_reader :user

  def initialize(user, _record)
    @user = user
  end

  def index?
    true
  end
end

