FROM node:16-alpine AS production
WORKDIR /usr/src/app
# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

# EXPOSE 8080
CMD [ "node","dist/main" ]