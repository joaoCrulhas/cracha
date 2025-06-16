#!/bin/bash

# Exit on any error
set -e

# Absolute or relative path to your schema
SCHEMA_PATH="prisma/schema.prisma"


# Path to your .env.test file
ENV_FILE=".env.test"


# Check if env file exists
if [ ! -f "$ENV_FILE" ]; then
  echo "❌ Error: $ENV_FILE not found!"
  exit 1
fi


echo "Executing the tests...."
docker ps
