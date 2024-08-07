# syntax = docker/dockerfile:1

# Make sure RUBY_VERSION matches the Ruby version in .ruby-version and Gemfile
ARG RUBY_VERSION=3.2.2

FROM registry.docker.com/library/ruby:$RUBY_VERSION-slim

# Rails app lives here
WORKDIR /app

# Install packages needed to build gems
RUN apt-get update -qq && \
  apt-get install --no-install-recommends -y build-essential git libpq-dev bash bash-completion libvips pkg-config curl gnupg2 postgresql-client nano && \
  apt-get clean

# Copying Gemfile and Gemfile.lock
COPY Gemfile Gemfile.lock ./

# Install gems
RUN bundle check || bundle install --jobs 20 --retry 5

# Copy application code
COPY . ./

# Make file executable
RUN chmod +x ./entrypoint.sh

# Entrypoint prepares the database.
ENTRYPOINT ["./entrypoint.sh"]

# Start the server by default, this can be overwritten at runtime
EXPOSE 3001

CMD ["rails", "s", "-b", "0.0.0.0", "-p", "3001"]