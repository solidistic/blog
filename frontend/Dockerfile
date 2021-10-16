FROM node:13.12.0-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev-start"]
# RUN npm run build
# RUN npm install -g serve

# CMD [ "serve", "-s", "build", "-l", "3000" ]