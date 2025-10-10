FROM node:22.19.0-alpine

WORKDIR /app

# COPY package.json .

COPY package.json package-lock.json .

RUN npm ci --only=production --no-cache

COPY . .

EXPOSE 8000

CMD ["npm", "run", "start"]



# Build Stage
# FROM node:22.19.0-alpine AS build

# WORKDIR /app
# COPY package.json package-lock.json ./
# RUN npm ci --only=production
# COPY . .

# # Final distroless image
# FROM gcr.io/distroless/nodejs22-debian12

# WORKDIR /app
# COPY --from=build /app /app


# CMD ["node", "server.js"]

