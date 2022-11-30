# Stage 1
FROM node:18.12-alpine as frontend

WORKDIR /webapp
COPY package.json .
RUN npm i
COPY . .
RUN npm run build

# Stage 2
FROM nginx:1.23.2-alpine

WORKDIR /usr/share/nginx/html
COPY --from=frontend /webapp/src/dist .
# Copying the nginx file for updating routes
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD nginx -g 'daemon off;'