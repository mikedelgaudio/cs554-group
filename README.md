# DuckedIn

The friendly Stevens way to view individuals.

## How to run

### Option 1: Individual Localhost

If you do not wish to use Docker, run each stack on your machine.

You'll need to run the frontend, backend, and default Redis and MongoDB server on your machine.

#### Production Frontend

> **Note**
> You must have the `.env` file

- `cd frontend`
- `npm install`
- `npm start`

Open your browser to http://localhost:4173/ for the production React code.

#### Production Backend

> **Note**
> You must have the `.env` file

- `cd backend`
- `npm install`
- `npm run build`
- `node dist/index.js`

The Express server runs on http://localhost:3001 for the production Express code.

### Option 2: Docker

You can run the entire stack with a docker-compose command or run the MongoDB, Redis on your own and build the individual containers yourself.

#### Run Docker Stack

Run the redis, mongodb, express, and nginx production servers in one command.

For security, redis and mongodb sit on an internal docker network and not exposed to the public internet.

```
docker network create external-proxy
docker-compose up
```

If you'd like to run the Docker apps individually:

#### Dockerfile frontend

In the root directory, run the production Nginx web server on port 4173.

> **Note**
> You must have the `.env` file

```
docker build --no-cache -f Dockerfile.frontend -t cs554-group-frontend:latest .
docker run --env-file ./frontend/.env -d -p 4173:80 --name cs554-group-frontend cs554-group-frontend:latest
```

### Dockerfile backend

In the root directory, run the production node server on port 3001.

> **Note**
> You must have the `.env` file and Redis running

```
docker build --no-cache -f Dockerfile.backend -t cs554-group-backend:latest .
docker run --env-file ./backend/.env  -d -p 3001:3001 --name cs554-group-backend cs554-group-backend:latest
```
