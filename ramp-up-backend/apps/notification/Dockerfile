FROM node:16.14

WORKDIR /usr/src/app

RUN npm -v

COPY . .

EXPOSE 3001

CMD [ "node", "dist/main.js" ]
