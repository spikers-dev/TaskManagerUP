if ENV['COVERAGE']
  require 'simplecov'
  require 'simplecov-lcov'

  SimpleCov::Formatter::LcovFormatter.config.report_with_single_file = true
  SimpleCov.formatter = SimpleCov::Formatter::LcovFormatter
  SimpleCov::Formatter::LcovFormatter.config do |c|
    c.single_report_path = 'coverage/lcov/lcov.info'
  end
  SimpleCov.start
end

ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'
require 'sidekiq/testing'

class ActiveSupport::TestCase
  include AuthHelper
  include FactoryBot::Syntax::Methods
  include ActionMailer::TestHelper
  # Run tests in parallel with specified workers
  parallelize(workers: :number_of_processors)

  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...
  Sidekiq::Testing.inline!

  def after_teardown
    super

    remove_uploaded_files
  end

  def remove_uploaded_files
    FileUtils.rm_rf(ActiveStorage::Blob.service.root)
  end
end
