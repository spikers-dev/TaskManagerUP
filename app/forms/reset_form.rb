class ResetForm
  include ActiveModel::Model

  attr_accessor :email

  validates :email, presence: true, format: { with: /\A\S+@.+\.\S+\z/ }
  validate :check_user_presence

  def user
    User.find_by(email: email)
  end

  private

  def check_user_presence
    errors.add(:email, 'user not found') unless user_valid?
  end

  def user_valid?
    user.present?
  end
end
