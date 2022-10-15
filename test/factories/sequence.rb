FactoryBot.define do
  sequence :string, aliases: [:name, :description, :first_name, :last_name, :password, :avatar] do |n|
    "string#{n}"
  end

  sequence :email do |n|
    "example#{n}@gmail.com"
  end

  sequence :expired_at do |n|
    n.days.from_now.to_date
  end
end
