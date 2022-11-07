module PasswordResetService
  def self.create_password_reset_token!(user)
    user.password_reset_token = generate_password_reset_token
    user.password_reset_expires_at = Time.zone.now + 1.days
    user.save!
  end

  def self.generate_password_reset_token
    SecureRandom.urlsafe_base64
  end

  def self.password_token_validation?(user)
    user.password_reset_expires_at < Date.today
  end

  def self.reset_password!(user)
    user.password_reset_token = nil
    user.password_reset_expires_at = nil
    user.save!
  end
end
