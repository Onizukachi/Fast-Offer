# Prepare for an interview and get a great offer

Here you will find a database of questions on all known IT languages, statistics on vacancies, employers, campaigns and more.

![image](https://github.com/user-attachments/assets/aa339854-bcd7-41cc-84aa-10a6f8ec431b)

![image](https://github.com/user-attachments/assets/9d5551a4-45c3-47a1-81d8-6316bf475534)

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
docker compose -f ./docker-compose.dev.yml up --build
```

#### Go to http://localhost:3000/:

For production you will need to pass RAILS_MASTER_KEY to .env.
