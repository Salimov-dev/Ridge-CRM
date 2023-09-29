FROM node as client

WORKDIR /app/client

COPY client/package.json /app/client

RUN npm install --force

COPY client /app/client

RUN npm run build

FROM node:alpine

WORKDIR /app

COPY server/package.json /app

RUN npm install

COPY server /app

FROM nginx

COPY client/nginx.conf /etc/nginx/nginx.conf

COPY --from=client /app/client/dist /app/client

EXPOSE 8080

CMD [ "npm", "start" ]