# Подготовься к собесу и получи крутой оффер

Здесь вы найдете базу вопросов по всем известным IT языкам, а так статистику по вакансиям, кампаниям и прочему.

## Tech stack


### Back-end
- [Rails](https://rubyonrails.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Redis](https://redis.io/)
- [Sidekiq](https://github.com/mperham/sidekiq)

### Front-end
- [React](https://ru.legacy.reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Redux](https://redux.js.org/)
- [NextUI](https://nextui.org/)
- [React-icons](https://react-icons.github.io/react-icons/)

### DEVOPS
- [Docker](https://www.docker.com/)
- [Docker compose](https://www.docker.com/)
- [Nginx](https://nginx.org/ru/)


## Running this app

You'll need to have [Docker installed](https://docs.docker.com/get-docker/)

#### Clone this repo anywhere you want and move into the directory:

```sh
git clone git@github.com:Onizukachi/Fast-Offer.git
cd Fast-Offer
```

#### Copy an example .env file because the real one is git ignored:

```sh
cp .env.example .env
```

By default, the Rails API will run in a local container and be accessible on port 3001. You can change this by setting the VITE_API_BASE_URL value in .env

#### Build everything:

```sh
docker compose up --build
```

#### Откройте сайт по урлу http://localhost:3000/:

####  Для продакшен, вам понадобится передать RAILS_MASTER_KEY в .env
