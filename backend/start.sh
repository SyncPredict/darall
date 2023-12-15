#!/bin/bash

# Проверка доступности базы данных
until pg_isready -h db -U user -d mydb; do
  echo "Waiting for database..."
  sleep 2
done


# Только при первом запуске (инициализация)
npx prisma generate
npx prisma migrate dev --name init

#npx prisma migrate deploy

npx ts-node start.ts
# Запуск приложения
npm start
