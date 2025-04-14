# Сборка приложения
FROM node:20-alpine AS builder

# Установка рабочей директории
WORKDIR /app

# Копирование package.json и lock-файла
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копирование исходного кода
COPY . .

# Сборка приложения
RUN npm run build || (echo "Build failed" && exit 1)

# Этап для запуска приложения
FROM nginx:alpine

# Копирование собранного приложения в Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Копирование пользовательского конфигурационного файла Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Порт, который будет слушать Nginx
EXPOSE 80

# Запуск Nginx
CMD ["nginx", "-g", "daemon off;"]