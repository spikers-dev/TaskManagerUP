class Web::PasswordResetsController < Web::ApplicationController
  def new
    @reset_password = ResetForm.new
  end

  def create
    @reset_password = ResetForm.new(reset_password_params)

    return render(:new) unless @reset_password.valid?

    user = @reset_password.user
    PasswordResetService.create_password_reset_token!(user)
    SendPasswordResetNotificationJob.perform_async(user.id)
    render('congratulation')
  end

  def edit
    @update_form = PasswordUpdateForm.new

    render('token_expired') if PasswordResetService.password_token_validation?(user)
  end

  def update
    @update_form = PasswordUpdateForm.new(password_params)

    return render(:edit) if @update_form.invalid?

    PasswordResetService.set_password!(user, password: @update_form.password)
    redirect_to(new_session_path)
  end

  private

  def password_params
    params.require(:password_update_form).permit(:password, :password_confirmation)
  end

  def reset_password_params
    params.require(:reset_form).permit(:email)
  end

  def user
    @user ||= User.find_by_password_reset_token!(params[:id])
  end
end
