# DuckedIn

The friendly Stevens way to view individuals.

## Run Docker Stack

Run the redis, mongodb, express, and nginx production servers in one command.

For security, redis and mongodb sit on an internal docker network and not exposed to the public internet.

```
docker network create external-proxy
docker-compose up
```

If you'd like to run the apps individually:

## Development Frontend

- `cd frontend`
- `npm install`
- `npm run dev`

### Dockerfile frontend

Run the production nginx web server build on port 3000.

```
docker build --no-cache -f Dockerfile.frontend -t cs554-group-frontend:latest .
docker run -d -p 3000:80 --name cs554-group-frontend cs554-group-frontend:latest
```

## Development Backend

- `cd backend`
- `npm install`
- `npm run dev`

### Dockerfile backend

Run the production node server on port 3001.

```
docker build --no-cache -f Dockerfile.backend -t cs554-group-backend:latest .
docker run -d -p 3001:3001 --name cs554-group-backend cs554-group-backend:latest
```
