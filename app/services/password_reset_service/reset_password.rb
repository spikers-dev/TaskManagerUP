module PasswordResetService
  class ResetPassword < ApplicationService
    attr_reader :user

    def initialize(user)
      @user = user
    end

    def call
      @user.password_reset_token = nil
      @user.save!
    end
  end
end
