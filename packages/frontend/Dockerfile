# Frontend Dockerfile for monorepo
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy root package.json and workspace configuration
COPY package*.json ./
COPY turbo.json ./

# Copy all workspace packages
COPY packages ./packages

# Install dependencies from root
RUN npm ci

# Build the frontend specifically
RUN npm run build:frontend

# Production stage with nginx
FROM nginx:alpine AS production

# Install wget for health checks
RUN apk add --no-cache wget

# Copy built React app to nginx html directory
COPY --from=builder /app/packages/frontend/build /usr/share/nginx/html

# Copy custom nginx configuration
COPY packages/frontend/nginx.conf /etc/nginx/nginx.conf

# Create non-root user for security
RUN addgroup -g 1001 -S nginx-user && \
    adduser -S frontend -u 1001 -G nginx-user

# Change ownership of nginx directories
RUN chown -R frontend:nginx-user /var/cache/nginx && \
    chown -R frontend:nginx-user /var/log/nginx && \
    chown -R frontend:nginx-user /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R frontend:nginx-user /var/run/nginx.pid

# Switch to non-root user
USER frontend

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
