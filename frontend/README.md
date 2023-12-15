# Darall Test
## Описание
Тестовое задание 

## Технологический стек
### Backend: 
- Node.js, 
- TypeScript, 
- Express.js, 
- PostgreSQL, 
- Prisma ORM
### Frontend: 
- Vue.js 3,
- Pinia
- Axios,
Styles: 
- SCSS, 
- БЭМ
Дополнительно: 
- Docker

# Установка и запуск
## Предварительные требования
- Установленный Docker и Docker Compose

## Запуск с помощью Docker
- Клонируйте репозиторий на локальную машину.
- Перейдите в корневую директорию проекта.
- Запустите сервисы с помощью команды:

```docker-compose up --build```



## Скрипт start.sh
### Важные замечания
Скрипт start.sh используется для запуска backend-сервиса.

При первом запуске выполняются команды `npx prisma generate` и `npx prisma migrate dev --name init` для инициализации базы данных.

При последующих запусках рекомендуется использовать `npx prisma migrate deploy` для применения миграций, созданных локально.


## Данные для входа

При инициализации устанавливается Тестовый user:

`email: 'test@prisma.io'`

`password: '12345'`