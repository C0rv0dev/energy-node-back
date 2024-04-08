FROM node:18

WORKDIR /app-api

COPY package*.json .

RUN npm install

COPY . .

CMD npm run start
