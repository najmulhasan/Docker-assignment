############################
# Frontend - Builder Stage #
############################
FROM node:20-alpine AS frontend-builder

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig.json next.config.js postcss.config.js tailwind.config.ts ./ 
COPY src ./src

ARG NEXT_PUBLIC_API_URL=http://localhost:5000/api
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN npm run build

############################
# Frontend - Runtime Stage #
############################
FROM node:20-alpine AS frontend-runtime

WORKDIR /usr/src/app

RUN addgroup -S nodegrp && adduser -S nodeuser -G nodegrp

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --from=frontend-builder /usr/src/app/.next ./.next
COPY next.config.js ./

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

USER nodeuser

CMD ["npm", "start"]


