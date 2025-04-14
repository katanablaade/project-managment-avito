# Project Management Systems

## Содержание

- [Технологии](#технологии)
- [Начало работы](#начало-работы)

## Обязательные технологии

- [React 19](https://react.dev)
- [React Router Dom](https://reactrouter.com/start/declarative/installation)

## Необязательные технологии с пояснением

- [TypeScript](https://www.typescriptlang.org/) — помогает писать более безопасный код, уменьшает количество ошибок во время выполнения и улучшает читаемость кода
- [Redux](https://react-redux.js.org) — для управления глобальным состоянием приложения.
- [Vite](https://vite.dev/) — быстрее, чем webpack, удобная настройка и запуск
- [React Hook Form](https://react-hook-form.com/) — эффективный способ работы с формами, минимизируя количество повторных рендеров
- [ESLint](https://eslint.org/) — инструмент, который помогает находить и исправлять проблемы с качеством кода,
- [Prettier](https://prettier.io/) — единый стиль кода, удобство написания
- [Redux-persist](https://www.npmjs.com/package/reduxjs-toolkit-persist) — возможность сохранять состояние Redux в локальном хранилище
- [Axios](https://axios-http.com) — удобный API для работы с RESTful API и другими сетевыми запросами

### Установка зависимостей

Клонировать репозиторий

```sh
git clone git@github.com:katanablaade/project-managment-avito.git
```

Запустить backend

```sh
cd project-management-avito/server
make initial-start
```

Запустить frontend

```sh
cd project-management-avito/client
npm install
docker build -t my-react-app .
docker run -d -p 8084:80 --name app my-react-app
```

Приложение будет доступно по адресу: .

```sh
http://localhost:8084
```
