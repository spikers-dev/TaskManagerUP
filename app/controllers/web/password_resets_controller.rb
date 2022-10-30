class Web::PasswordResetsController < Web::ApplicationController
  def new; end

  def create
    user = User.find_by_email(params[:user][:email])
    if user
      user.gen_password_reset_token
      user.password_reset_sent_at = Time.zone.now
      user.save!
      UserMailer.password_reset(user).deliver_now
      flash[:msg] = "Instructions sent to #{params[:user][:email]}"
    else
      flash[:msg] = "User with email #{params[:user][:email]} not found!"
    end
    render(:new)
  end

  def edit
    user = User.find_by_password_reset_token!(params[:id])
    if user.password_reset_sent_at < 1.day.ago
      redirect_to(new_password_reset_path)
      flash[:msg] = 'Reset token has expired.'
    end
  end

  def update
    user = User.find_by_password_reset_token!(params[:id])
    if user.update(user_params)
      user.clear_password_reset_token!
      redirect_to(new_session_path)
    else
      render(:edit)
    end
  end

  private

  def user_params
    params.require(:user).permit(:password, :password_confirmation)
  end
end
