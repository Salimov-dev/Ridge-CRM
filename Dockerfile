# Этап 1: Сборка клиентской части
FROM node as client
WORKDIR /app/client
COPY client/package.json /app/client
RUN npm install --force
COPY client /app/client
RUN npm run build

# Этап 2: Настройка серверной части
FROM node:alpine
WORKDIR /app
COPY server/package.json /app
RUN npm install
COPY server /app

# Этап 3: Конфигурация Nginx и копирование статических файлов клиента
FROM nginx
COPY client/nginx.conf /etc/nginx/nginx.conf
COPY --from=client /app/client/dist /app/client
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]