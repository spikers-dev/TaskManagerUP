class Web::PasswordResetsController < Web::ApplicationController
  def new
    @reset_password = ResetForm.new
  end

  def create
    @reset_password = ResetForm.new(reset_password_params)

    user = @reset_password.user
    if @reset_password.valid?
      PasswordResetService::GeneratePasswordResetToken.call(user)
      UserMailer.password_reset(user).deliver_now
      render('congratulation')
    else
      render(:new)
    end
  end

  def edit
    @update_form = PasswordUpdateForm.new

    user = User.find_by_password_reset_token!(params[:id])
    if PasswordResetService::PasswordTokenValidation.call(user)
      render('token_expired')
    end
  end

  def update
    @update_form = PasswordUpdateForm.new(password_params)

    user = User.find_by_password_reset_token!(params[:id])
    if user.update(password_params)
      PasswordResetService::ResetPassword.call(user)
      redirect_to(new_session_path)
    else
      render(:edit)
    end
  end

  private

  def password_params
    params.require(:password_update_form).permit(:password, :password_confirmation)
  end

  def reset_password_params
    params.require(:reset_form).permit(:email)
  end
end
