# Build stage
FROM node:18-slim as build

# Set working directory
WORKDIR /app

# Copy package files
COPY packages/plato-web/package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY packages/plato-web/ ./

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 