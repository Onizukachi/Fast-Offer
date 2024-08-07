# frozen_string_literal: true

class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist

  enum role: { basic: 0, moderator: 1, admin: 1 }, _suffix: :role

  validates :username, presence: true, length: { minimum: 3 }, uniqueness: true
  validates :password, confirmation: true
  validates :password_confirmation, presence: true

  has_many :questions, dependent: :destroy
  has_many :answers, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :favorites, dependent: :destroy
  has_many :favorite_questions, through: :favorites, source: :question

  before_save :set_gravatar_hash, if: :email_changed?

  def nickname
    username || email.split('@').first
  end

  def author?(record)
    self == record.author
  end

  def ban
    update(is_banned: true) if basic_role?
  end

  def unban
    update(is_banned: false) if basic_role?
  end

  private

  def set_gravatar_hash
    return if email.blank?

    hash = Digest::MD5.hexdigest email.strip.downcase
    self.gravatar_hash = hash
  end
end
