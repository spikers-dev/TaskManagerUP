require 'test_helper'

class ManagerTest < ActiveSupport::TestCase
  test 'create' do
    task = create(:task)
    assert task.persisted?
  end
end
