#!/bin/bash

# Exit on any error
set -e

echo "Cleaning the psql-test service...."
docker compose down -v postgres-test

echo "Starting the psql-test service container...."
docker compose up -d postgres-test

echo "⏳ Waiting for postgres-test to be healthy..."

# Wait for the container to be healthy
until [ "$(docker inspect -f '{{.State.Health.Status}}' psql-test)" == "healthy" ]; do
  echo "⌛ Still waiting for postgres-test to be healthy..."
  sleep 3
done

echo "Container to test is healthy...."

echo "Execute the migrations in this container"
DATABASE_URL="postgresql://root:password@localhost:5435/cracha-test" nx run prisma:migrate-dev

echo "🍟 Running the seeds "
DATABASE_URL="postgresql://root:password@localhost:5435/cracha-test" nx run prisma:seed


echo "🧪 Starting test cracha backend"
nx run cracha:test
