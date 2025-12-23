############################
# Backend - Builder Stage  #
############################
FROM node:20-alpine AS backend-builder

WORKDIR /usr/src/app

# Install build tools for native deps only if needed
RUN apk add --no-cache python3 make g++ \
  && ln -sf python3 /usr/bin/python

# Install dependencies (leverage Docker layer cache)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build
COPY tsconfig.json ./
COPY src ./src

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN npm run build

############################
# Backend - Runtime Stage  #
############################
FROM node:20-alpine AS backend-runtime

WORKDIR /usr/src/app

# Set non-root user for security
RUN addgroup -S nodegrp && adduser -S nodeuser -G nodegrp

# Only copy production dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy compiled JS and any runtime assets
COPY --from=backend-builder /usr/src/app/dist ./dist
COPY .env.example ./env.example

ENV NODE_ENV=production
ENV PORT=5000

# Healthcheck path is /api/health (see src/index.ts)
EXPOSE 5000

USER nodeuser

CMD ["node", "dist/index.js"]


