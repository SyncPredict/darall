FROM node:20

WORKDIR /app

COPY package*.json ./


RUN npm install

# Копирование Prisma схемы
COPY prisma ./prisma
RUN npx prisma generate


COPY . .

RUN npm run build
# Установка PostgreSQL клиента
RUN apt-get update && apt-get install -y dos2unix postgresql-client
EXPOSE 5000

COPY start.sh /start.sh
RUN chmod +x /start.sh
RUN dos2unix /app/start.sh
CMD ["./start.sh"]
