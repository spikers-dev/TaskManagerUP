class SendTaskDestroyNotificationJob < ApplicationJob
  def perform(task_author_id, task_id)
    user = User.find(task_author_id)
    return if user.blank?

    UserMailer.with(user: user, task_id: task_id).task_deleted.deliver_now
  end
end
