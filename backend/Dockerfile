FROM node:14

WORKDIR /app

# Install netcat for database connection checking
RUN apt-get update && apt-get install -y netcat-openbsd

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

# Generate Prisma client
RUN npx prisma generate

# Create and set up the entrypoint script
RUN echo '#!/bin/bash\n\
set -e\n\
\n\
echo "Waiting for MySQL to be ready..."\n\
while ! nc -z db 3306; do\n\
  sleep 1\n\
done\n\
\n\
echo "Running migrations..."\n\
npx prisma migrate deploy\n\
\n\
echo "Starting the application..."\n\
exec npm start' > /entrypoint.sh && \
    chmod +x /entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/entrypoint.sh"]