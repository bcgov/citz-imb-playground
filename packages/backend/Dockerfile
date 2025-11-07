# Backend Dockerfile for monorepo
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Development stage
FROM base AS builder

# Copy root package.json and workspace configuration
COPY package*.json ./
COPY turbo.json ./

# Copy all workspace packages
COPY packages ./packages

# Install all dependencies from root
RUN npm ci

# Build the backend specifically
RUN npm run build:backend

# Production stage
FROM base AS production

# Copy root package files
COPY package*.json ./
COPY turbo.json ./

# Copy shared package
COPY packages/shared ./packages/shared

# Copy backend package files
COPY packages/backend/package*.json ./packages/backend/

# Install dependencies for production
RUN npm ci --only=production && npm cache clean --force

# Copy built backend from builder stage
COPY --from=builder /app/packages/backend/dist ./packages/backend/dist

# Set working directory to backend
WORKDIR /app/packages/backend

# Create uploads directory
RUN mkdir -p uploads

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S backend -u 1001

# Change ownership of the app directory
RUN chown -R backend:nodejs /app
USER backend

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "const http = require('http'); \
    const options = { host: 'localhost', port: 3001, path: '/api/health', timeout: 2000 }; \
    const req = http.request(options, (res) => { \
      console.log(\`STATUS: \${res.statusCode}\`); \
      process.exit(res.statusCode === 200 ? 0 : 1); \
    }); \
    req.on('error', () => process.exit(1)); \
    req.end();"

# Start the application
CMD ["npm", "start"]
