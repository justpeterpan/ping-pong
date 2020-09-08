FROM node:14.9.0

RUN mkdir -p /app/frontend/
WORKDIR /app/frontend/

COPY ./package.json .

RUN npm install

COPY . /app/frontend

CMD npm run serve