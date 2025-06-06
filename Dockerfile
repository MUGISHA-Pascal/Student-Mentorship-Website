FROM node:lts-alpine as builder

WORKDIR /usr/src/app

COPY ./package.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
