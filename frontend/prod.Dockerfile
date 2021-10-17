FROM node:13.12.0-alpine

EXPOSE 3000

ENV REACT_APP_BACKEND_URI=https://solidistic-api.herokuapp.com

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "node", "server/index.js" ]
