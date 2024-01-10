FROM node:20.6-bullseye-slim as base

WORKDIR /app

# Copy files - ignores files from .dockerignore file.
COPY . .

# ================================= #
# 🐳🐳       DEV BUILD       🐳🐳 #
# ================================= #
FROM base as dev
ENV NODE_ENV=development

# Install packages.
RUN npm i

# Expose port for dev server.
EXPOSE 6500

# Start the development server.
CMD ["npm", "run", "dev"]

# ================================= #
# 🐳🐳   [1/2] PROD BUILD    🐳🐳 #
# ================================= #
FROM base as prod-build

WORKDIR /app

# Omits dev dependencies on install.
ENV NODE_ENV=production

# Install packages and build the project.
RUN npm i && \
    npm run build

# ================================= #
# 🐳🐳   [2/2] PROD NGINX    🐳🐳 #
# ================================= #
FROM nginx:alpine-slim as prod

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Set working directory to nginx asset directory.
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets and change permissions.
RUN rm -rf ./* && \
    chmod g+rwx /var/cache/nginx /var/run /var/log/nginx

# Copy build files.
COPY --from=prod-build /app/build .

EXPOSE 6500

ENTRYPOINT ["nginx", "-g", "daemon off;"]
