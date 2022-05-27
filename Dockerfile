FROM node:16-alpine as p
WORKDIR /usr/src/app
COPY . .
CMD [ "node","dist/main" ]