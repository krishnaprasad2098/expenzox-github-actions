FROM node:22.19.0-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json .

# RUN npm install
RUN npm ci && npm cache clean --force

COPY . .

RUN npm run build

# EXPOSE 5173

# CMD ["npm", "run", "dev"]

# Stage 2: Production (serve static site)
FROM nginx:alpine

# Clean out default nginx html folder
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]