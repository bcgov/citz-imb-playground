FROM node:20.6-bullseye-slim as base

WORKDIR /app

# Copy files - ignores files from .dockerignore file.
COPY backend/ .

# Copy frontend package json to root dir, not app dir because of volume mount.
COPY frontend/package.json ../frontendPackage.json

# ================================= #
# 🐳🐳       DEV BUILD       🐳🐳 #
# ================================= #
FROM base as dev
ENV NODE_ENV=development

# Install packages.
RUN npm i

# Nodemon Entrypoint.
CMD ["npm", "run", "dev"]

# ================================= #
# 🐳🐳       PROD Build      🐳🐳 #
# ================================= #
FROM base as prod-build

WORKDIR /app

# Install packages and build the project.
RUN npm i && \
    npm run build

# ================================= #
# 🐳🐳          PROD         🐳🐳 #
# ================================= #
FROM prod-build as prod

WORKDIR /app

ENV NODE_ENV=production

# Install packages (omits dev dependencies when NODE_ENV=production).
COPY --from=base /app/package.json .
COPY --from=base frontendPackage.json .
RUN npm i

COPY --from=prod-build /app/build/ .

# Node Entrypoint.
CMD ["node","src/index.js"]
