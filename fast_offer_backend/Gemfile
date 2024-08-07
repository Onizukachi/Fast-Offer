source 'https://rubygems.org'

ruby '3.2.2'

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem 'rails', '~> 7.1.3', '>= 7.1.3.4'

gem 'devise', '~> 4.9'

gem 'faraday'

gem 'nokogiri'

gem 'redis'

gem 'sidekiq'

gem 'sidekiq-scheduler'

gem 'devise-jwt'

gem 'ancestry'

gem 'activerecord_cursor_paginate'

gem 'mini_magick'

# Use postgresql as the database for Active Record
gem 'pg', '~> 1.1'

# Use the Puma web server [https://github.com/puma/puma]
gem 'puma', '>= 5.0'

gem 'acts-as-taggable-on', '~> 10.0'

gem 'rails-i18n', '~> 7.0.0'

gem 'jsonapi-serializer'

gem 'freezolite'

# Use Kredis to get higher-level data types in Redis [https://github.com/rails/kredis]
# gem "kredis"

# Use Active Model has_secure_password [https://guides.rubyonrails.org/active_model_basics.html#securepassword]
# gem "bcrypt", "~> 3.1.7"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[ windows jruby ]

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', require: false

# Use Active Storage variants [https://guides.rubyonrails.org/active_storage_overview.html#transforming-images]
# gem "image_processing", "~> 1.2"

# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin Ajax possible
gem 'rack-cors'

group :development, :test do
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem 'debug', platforms: %i[ mri windows ]
  gem 'dotenv'
  gem 'byebug'
  gem 'rspec-rails'
  gem 'faker'
end

group :development do
  # Speed up commands on slow machines / big apps [https://github.com/rails/spring]
  # gem "spring"
end

group :test do
  gem 'database_cleaner'
  gem 'shoulda-matchers', '~> 6.0'
  gem 'factory_bot_rails'
end

gem "pundit", "~> 2.3"
