#!/bin/bash

# Exit on any error
set -e

# Absolute or relative path to your schema
SCHEMA_PATH="prisma/schema.prisma"

# Path to your .env.test file
ENV_FILE=".env.test"

echo "🔄 Running Prisma migrate on test database..."
echo "📄 Using schema: $SCHEMA_PATH"
echo "🌐 Loading env from: $ENV_FILE"

# Check if env file exists
if [ ! -f "$ENV_FILE" ]; then
  echo "❌ Error: $ENV_FILE not found!"
  exit 1
fi

# Run the migration
npx prisma migrate dev --schema="$SCHEMA_PATH" --env-file="$ENV_FILE"

echo "✅ Migration completed."
