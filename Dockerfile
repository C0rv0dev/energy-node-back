FROM node:18 as build-stage

WORKDIR /usr/src/app

COPY ./package*.json ./

ENV PATH ./node_modules/.bin:$PATH

RUN npm install

COPY ./ ./

EXPOSE 5000

CMD ["npm", "run", "dev"]
