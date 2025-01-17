#!/bin/bash
set -e

echo "Waiting for MySQL to be ready..."
while ! nc -z db 3306; do
  sleep 1
done

echo "Running migrations..."
npx prisma migrate deploy

echo "Starting the application..."
exec npm start