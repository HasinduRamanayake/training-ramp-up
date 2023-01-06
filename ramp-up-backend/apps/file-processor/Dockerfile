FROM node:16.14

WORKDIR /usr/src/app

RUN npm -v

COPY . .

EXPOSE 4500

CMD [ "node", "dist/main.js" ]