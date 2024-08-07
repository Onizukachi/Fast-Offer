# syntax = docker/dockerfile:1

# Make sure RUBY_VERSION matches the Ruby version in .ruby-version and Gemfile
ARG RUBY_VERSION=3.2.2
FROM registry.docker.com/library/ruby:$RUBY_VERSION-slim

# Rails app lives here
WORKDIR /rails_app

# Install packages needed to build gems
RUN apt-get update -qq && \
  apt-get install --no-install-recommends -y build-essential git libpq-dev libvips pkg-config curl gnupg2 postgresql-client nano

# Install gems
COPY Gemfile Gemfile.lock ./
RUN bundle check || bundle install --jobs 20 --retry 5

# Copy application code
COPY . ./

# Entrypoint prepares the database.
ENTRYPOINT ["./entrypoint.sh"]

# Start the server by default, this can be overwritten at runtime
EXPOSE 3001
CMD ["rails", "s"]