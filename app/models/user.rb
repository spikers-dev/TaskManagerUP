class User < ApplicationRecord
  has_secure_password
  has_many :my_tasks, class_name: 'Task', foreign_key: :author_id
  has_many :assigned_tasks, class_name: 'Task', foreign_key: :assignee_id

  validates :first_name, :last_name, :email, presence: true
  validates :first_name, :last_name, length: { minimum: 2 }
  validates :email, uniqueness: true, format: { with: /@/ }

  def gen_password_reset_token
    self.password_reset_token = SecureRandom.urlsafe_base64
  end

  def clear_password_reset_token!
    self.password_reset_token = nil
    save!
  end
end
