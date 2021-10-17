FROM node:13.12.0-alpine

EXPOSE 3000

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build
RUN npm install -g serve

CMD [ "serve", "-s", "build", "-l", "3000" ]
