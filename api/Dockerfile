FROM node:18.12-alpine

WORKDIR /api
COPY package.json .
RUN npm i
COPY . .
CMD node server.js