FROM node:14.9.0-alpine3.12

RUN mkdir -p /app/api/
WORKDIR /app/api/

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

COPY . /app/api/

CMD npm start