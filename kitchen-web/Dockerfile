### STAGE 1: Build ###
FROM node:latest AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
### STAGE 2: Run ###
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'