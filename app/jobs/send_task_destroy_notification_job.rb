class SendTaskDestroyNotificationJob < ApplicationJob
  def perform(task_author, task_id)
    user = User.find(task_author)
    return if user.blank?

    UserMailer.with(user: user, task: task_id).task_deleted.deliver_now
  end
end
