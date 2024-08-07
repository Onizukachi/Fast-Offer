#!/bin/bash
set -e

# Remove a potentially pre-existing server.pid for Rails.
if [ -f tmp/pids/server.pid ]; then
  rm tmp/pids/server.pid
fi

echo "Checking gems ..."
bundle check || bundle install

echo "Prepare database ..."
bundle exec rake db:prepare

# Then exec the container's main process (what's set as CMD in the Dockerfile).
echo "Starting rails app server ..."

exec "$@"