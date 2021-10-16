FROM ubuntu:latest

WORKDIR /usr/src/app

ENV NODE_ENV=development

RUN apt update && apt-get update && apt install -y curl
RUN apt-get install -y build-essential && apt-get install -y python
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash
RUN apt install -y nodejs

COPY package-lock.json ./
COPY package.json ./

RUN npm install -g nodemon
RUN npm install

COPY server ./server
COPY database ./database

EXPOSE 8080

CMD [ "npm", "run", "dev-server" ]