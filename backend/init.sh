#!/bin/sh
set -e

echo "Waiting for MySQL to start..."
/app/wait-for-it.sh db:3306 -t 60

echo "Running migrations..."
npx prisma migrate deploy

echo "Starting the application..."
npm start