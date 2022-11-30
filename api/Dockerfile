FROM node:18.12-alpine
WORKDIR /api
COPY package.json .
RUN npm install
COPY . .
CMD node server.js

