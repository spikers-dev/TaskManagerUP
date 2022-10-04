FactoryBot.define do
  sequence :string, aliases: [:name, :description, :first_name, :last_name, :password, :avatar] do |n|
    "string#{n}"
  end

  sequence :email do |n|
    "example#{n}@gmail.com"
  end

  sequence :state, [:new_task, :in_development].cycle

  sequence :expired_at do |n|
    n.days.after
  end
end
