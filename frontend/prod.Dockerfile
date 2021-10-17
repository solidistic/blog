FROM node:13.12.0-alpine

EXPOSE 3000

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "node", "server/index.js" ]
