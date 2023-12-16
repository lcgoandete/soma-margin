FROM node:16.18.0-alpine
WORKDIR /app

COPY package*.json ./
COPY .env ./
COPY src/ ./src/
COPY prisma/ ./prisma/

RUN npm install

EXPOSE 12000

ENTRYPOINT ["npm", "start"]
