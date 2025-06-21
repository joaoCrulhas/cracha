#!/bin/bash

# Exit on any error
set -e

# Check if environment argument is passed
if [ -z "$1" ]; then
  echo "❌ Environment argument missing. Use: ./run.sh [DEV|TEST]"
  exit 1
fi

ENV="$1"

# Define configuration based on environment
if [ "$ENV" == "DEV" ]; then
  COMMAND_RUN="nx run cracha:serve:development"
  SERVICE_NAME="postgres"
  CONTAINER_NAME="psql-dev"
  DATABASE_URL="postgresql://root:password@localhost:5432/cracha-dev"
elif [ "$ENV" == "TEST" ]; then
  COMMAND_RUN="nx run cracha:test"
  SERVICE_NAME="postgres-test"
  CONTAINER_NAME="psql-test"
  DATABASE_URL="postgresql://root:password@localhost:5435/cracha-test"
else
  echo "❌ Unknown environment: $ENV. Use DEV or TEST."
  exit 1
fi

echo "🧹 Cleaning the $SERVICE_NAME service..."
docker compose down -v $SERVICE_NAME

echo "🚀 Starting the $SERVICE_NAME service container..."
docker compose up -d $SERVICE_NAME

echo "⏳ Waiting for $CONTAINER_NAME to be healthy..."

# Wait for the container to be healthy
until [ "$(docker inspect -f '{{.State.Health.Status}}' $CONTAINER_NAME)" == "healthy" ]; do
  echo "⌛ Still waiting for $CONTAINER_NAME to be healthy..."
  sleep 3
done

echo "✅ $CONTAINER_NAME is healthy."

echo "📦 Running migrations..."
DATABASE_URL="$DATABASE_URL" nx run prisma:migrate-dev

echo "🌱 Running seeds..."
DATABASE_URL="$DATABASE_URL" nx run prisma:seed

echo "Running the $ENV cracha backend"
DATABASE_URL="$DATABASE_URL" $COMMAND_RUN
