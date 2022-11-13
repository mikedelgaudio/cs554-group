# cs554-group

## Technical stack:

- React
- Typescript
- MongoDB
- Redis

## Development Frontend

- `cd frontend`
- `npm install`
- `npm run dev`

## Development Backend

- `cd backend`
- `npm install`
- `npm run dev`

## Docker build backend

Ensure you have a `/dist` freshly compiled to see changes.

- `cd backend`
- `npm install`
- `npm run build`

```
docker build -f Dockerfile.backend -t cs554-group-backend:latest .
docker run -d -p 3001:3001 --name cs554-group-backend cs554-group-backend:latest
```

## Docker build frontend

TBD
