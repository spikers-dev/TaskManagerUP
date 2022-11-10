class SendPasswordResetNotificationJob < ApplicationJob
  def perform(user_id)
    user = User.find_by(id: user_id)
    return if user.blank?

    UserMailer.password_reset(user).deliver_now
  end
end
