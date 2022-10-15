admin = Admin.find_or_create_by(first_name: 'admin', last_name: 'admin', email: 'admin@localhost.ru')
admin.password = 'admin'
admin.save

60.times do
  u = [Manager, Developer].sample.new
  u.first_name = Faker::Name.first_name
  u.last_name = Faker::Name.last_name
  u.email = Faker::Internet.email(name: "#{u.first_name} #{u.last_name}", separators: '.')
  u.password = 'default'
  u.save
end

70.times do
    t = Task.new
    t.name = Faker::Hacker.noun.capitalize
    t.description = Faker::Hacker.say_something_smart
    t.author = User.where(type: "Manager").sample
    t.assignee = User.where(type: "Developer").sample
    t.state = ['new_task',
               'in_development',
               'in_qa',
               'in_code_review',
               'ready_for_release',
               'released',
               'archived',
              ].sample
    t.expired_at = Faker::Time.between(from: DateTime.now - 1, to: DateTime.now + 30)
    t.save
  end