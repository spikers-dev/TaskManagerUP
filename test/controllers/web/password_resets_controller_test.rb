require 'test_helper'

class Web::PasswordResetsControllerTest < ActionController::TestCase
  test 'should get new' do
    get :new
    assert_response :success
  end

  test 'should post create' do
    user = create(:user)
    attrs = { email: user.email }
    assert_emails 1 do
      post :create, params: { reset_form: attrs }
    end
    assert_response :success
  end

  test 'should get edit' do
    user = create(:user, password_reset_token: 'test', password_reset_expires_at: Time.zone.now + 1.days)
    get :edit, params: { id: 'test' }
    assert_response :success
  end

  test 'should post update' do
    user = create(:user)
    attrs = { email: user.email }
    post :create, params: { reset_form: attrs }
    token = User.find(user.id).password_reset_token
    reset_attrs = { password: 'password', password_confirmation: 'password' }
    post :update, params: { id: token, password_update_form: reset_attrs }
    assert_response :redirect
  end
end
