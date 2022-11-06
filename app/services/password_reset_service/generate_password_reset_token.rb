module PasswordResetService
  class GeneratePasswordResetToken < ApplicationService
    attr_reader :user

    def initialize(user)
      @user = user
    end

    def call
      @user.password_reset_token = generate_password_reset_token
      @user.password_reset_expires_at = Time.zone.now + 1.days
      @user.save!
    end

    def generate_password_reset_token
      SecureRandom.urlsafe_base64
    end
  end
end
