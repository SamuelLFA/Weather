FROM node:12

WORKDIR /usr/src/open_weather_api

COPY package*.json ./

RUN npm install
RUN npm ci --only=production

COPY . .

EXPOSE 8081

CMD [ "node", "src/index.js" ]