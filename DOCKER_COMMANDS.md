## Docker & Docker Compose Commands and Documentation

### 1. Backend Image

- **Build backend image**

```bash
docker build -t nazmulhasan91/ecommerce-backend:latest ./backend
docker tag nazmulhasan91/ecommerce-backend:latest nazmulhasan91/ecommerce-backend:v1
```

- **Purpose**: Builds the backend image using the multi-stage `backend/Dockerfile`. The builder stage compiles TypeScript to JavaScript, and the runtime stage uses a minimal `node:20-alpine` base with only production dependencies.

- **Build with custom arguments (e.g., NODE_ENV)**

```bash
docker build \
  --build-arg NODE_ENV=production \
  -t nazmulhasan91/ecommerce-backend:prod ./backend
```

- **Purpose**: Demonstrates use of build arguments to control environment-specific behavior during image build.

- **Push backend image to Docker Hub**

```bash
docker push nazmulhasan91/ecommerce-backend:latest
docker push nazmulhasan91/ecommerce-backend:prod
docker push nazmulhasan91/ecommerce-backend:v1
```

- **Purpose**: Uploads tagged backend images to Docker Hub for deployment or sharing.

### 2. Frontend Image

- **Build frontend image**

```bash
docker build -t nazmulhasan91/ecommerce-frontend:latest ./frontend
docker tag nazmulhasan91/ecommerce-frontend:latest nazmulhasan91/ecommerce-frontend:v1
```

- **Purpose**: Builds the frontend Next.js image with a multi-stage `frontend/Dockerfile`. The builder stage runs `npm run build`, and the runtime stage serves the built app using a slim `node:20-alpine` image.

- **Build with API URL override**

```bash
docker build \
  --build-arg NEXT_PUBLIC_API_URL=http://localhost:5000/api \
  -t nazmulhasan91/ecommerce-frontend:local ./frontend
```

- **Purpose**: Uses build arguments and environment variables to configure the API base URL inside the built Next.js app.

- **Push frontend image to Docker Hub**

```bash
docker push nazmulhasan91/ecommerce-frontend:latest
docker push nazmulhasan91/ecommerce-frontend:local
docker push nazmulhasan91/ecommerce-frontend:v1
```

- **Purpose**: Publishes the frontend images with appropriate tags.

### 3. Tagging and Inspecting Images

- **List local images**

```bash
docker images
```

- **Purpose**: Shows all local images, including repository, tag, image ID, and size. Use this to review backend and frontend image sizes.

- **Add additional tags**

```bash
docker tag nazmulhasan91/ecommerce-backend:latest \
  nazmulhasan91/ecommerce-backend:v1

docker tag nazmulhasan91/ecommerce-frontend:latest \
  nazmulhasan91/ecommerce-frontend:v1
```

- **Purpose**: Applies semantic version-style tags (`v1`) in addition to `latest` to meet tagging best practices.

- **Inspect layers and metadata**

```bash
docker history nazmulhasan91/ecommerce-backend:latest
docker history nazmulhasan91/ecommerce-frontend:latest
```

- **Purpose**: Shows the number of layers, the command that created each layer, and compressed size. This is used to analyze layer optimization and understand how multi-stage builds keep final images slim.

```bash
docker inspect nazmulhasan91/ecommerce-backend:latest
docker inspect nazmulhasan91/ecommerce-frontend:latest
```

- **Purpose**: Provides detailed JSON metadata on images, including environment variables, exposed ports, entrypoint, and layer digests.

### 4. Running Containers Without Compose

- **Run MongoDB**

```bash
docker run -d \
  --name ecommerce-mongo \
  -e MONGO_INITDB_DATABASE=ecommerce \
  -v mongo-data:/data/db \
  -p 27017:27017 \
  mongo:6.0
```

- **Purpose**: Starts a MongoDB container with a named volume for data persistence and exposes port `27017`.

- **Run backend (connecting to mongo container)**

```bash
docker run -d \
  --name ecommerce-backend \
  --env NODE_ENV=production \
  --env PORT=5000 \
  --env MONGODB_URI=mongodb://ecommerce-mongo:27017/ecommerce \
  --env JWT_SECRET=b7d8f5cba2d84e8eac1c8c5e3d34af2f5a9cbbd1f8e2f4d69cbb5e0f3f4c9e2a \
  --env JWT_EXPIRY=7d \
  --link ecommerce-mongo:mongo \
  -p 5000:5000 \
  nazmulhasan91/ecommerce-backend:latest
```

- **Purpose**: Runs the backend container, wiring necessary environment variables for database and JWT configuration and publishing port `5000`.

- **Run frontend**

```bash
docker run -d \
  --name ecommerce-frontend \
  --env NODE_ENV=production \
  --env PORT=3000 \
  -p 3000:3000 \
  nazmulhasan91/ecommerce-frontend:latest
```

- **Purpose**: Runs the frontend Next.js app, exposing it on port `3000`.

### 5. Docker Compose Usage

- **Build and start all services**

```bash
docker compose up --build
```

- **Purpose**: Uses `docker-compose.yml` to build images for `mongo`, `backend`, and `frontend` (using multi-stage Dockerfiles) and start all containers on the shared `ecommerce-net` network. Ensures proper service dependencies (`mongo` → `backend` → `frontend`) and restart policies.

- **Start in detached mode**

```bash
docker compose up -d
```

- **Purpose**: Runs the stack in the background, allowing you to keep using the terminal.

- **Stop and remove services**

```bash
docker compose down
```

- **Purpose**: Stops all running containers created by this Compose project and removes the default network, but keeps named volumes like `mongo-data`.

- **View logs**

```bash
docker compose logs -f
docker compose logs backend
docker compose logs frontend
```

- **Purpose**: Streams combined or service-specific logs, useful for debugging health checks, startup issues, or API connectivity.

### 6. Layer and Size Analysis Summary

- **Layer count analysis**
  - `docker history your-dockerhub-username/ecommerce-backend:latest` shows:
    - Base `node:20-alpine` layer(s)
    - Layer for `npm ci --omit=dev`
    - Layer for copying `dist/`
    - Final configuration layer (env/EXPOSE/CMD)
  - `docker history your-dockerhub-username/ecommerce-frontend:latest` shows a similar pattern:
    - Minimal base image
    - Production dependencies only
    - Built `.next` output
    - Final configuration layer

- **Image size review**
  - `docker images` lists backend and frontend sizes; multi-stage builds and `npm ci --omit=dev` keep runtime images smaller than development images.
  - Using `node:20-alpine` as the base image further reduces size compared to full `node` images.

### 7. Security and Best Practices Implemented

- Multi-stage builds: Separate **builder** and **runtime** stages for both backend and frontend.
- Layer caching: Install dependencies before copying full source to maximize cache hits.
- Minimal base images: Use `node:20-alpine` for slim images.
- Build arguments and environment variables:
  - `NODE_ENV` and `NEXT_PUBLIC_API_URL` passed as `--build-arg` for frontend and backend.
  - Runtime environment configured via `environment` section in `docker-compose.yml`.
- Security hardening:
  - Non-root `nodeuser` used in runtime stages.
  - Only production dependencies copied into runtime images.
  - Separate Mongo volume (`mongo-data`) to avoid data loss when containers are recreated.


