module PasswordResetService
  class << self
    def create_password_reset_token!(user)
      user.password_reset_token = generate_password_reset_token
      user.password_reset_expires_at = Time.zone.now + 1.days
      user.save!
    end

    def generate_password_reset_token
      SecureRandom.urlsafe_base64
    end

    def password_token_validation?(user)
      user.password_reset_expires_at < Date.today
    end

    def reset_token!(user)
      user.password_reset_token = nil
      user.password_reset_expires_at = nil
      user.save!
    end

    def set_password!(user, password)
      user.update(password)
      reset_token!(user)
    end
  end
end
