class ApplicationMailer < ActionMailer::Base
  default from: Rails.env.production? ? ENV['MAILER_USERNAME'] : 'noreply@taskmanager.com'
  layout 'mailer'
end
