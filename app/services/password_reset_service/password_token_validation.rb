module PasswordResetService
  class PasswordTokenValidation < ApplicationService
    attr_reader :user

    def initialize(user)
      @user = user
    end

    def call
      user.password_reset_expires_at < Date.today
    end
  end
end
