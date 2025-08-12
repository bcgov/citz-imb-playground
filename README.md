# IMB Playground: TypeRacer - Real-time Multiplayer Typing Competition

Please note this repository is created to conduct PoC and experiment on new features/technologies. 

This is a TypeScript-based **monorepo** web application where users can host and join typing competitions to compete on speed and accuracy. Built with modern BC Government standards using the BC Design System for consistent user experience.

## 🏗️ Architecture

This TypeRacer application follows a **modern full-stack layered monolith architecture** with real-time communication:

### Architecture Layers
1. **Presentation Layer** (React + TypeScript)
   - Component-based UI with React hooks
   - Real-time state management for game interactions
   - Responsive design with styled components

2. **API Layer** (Express.js REST + Socket.IO)
   - RESTful endpoints for game creation and file uploads
   - WebSocket connections for real-time multiplayer features
   - CORS-enabled cross-origin communication

3. **Business Logic Layer** (Services + Socket Handlers)
   - Game state management service
   - Socket event handlers for real-time communication
   - File processing and validation logic

4. **Data Layer** (In-memory storage)
   - Runtime game state management
   - File system storage for uploaded content
   - No persistent database (stateless design)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Docker (optional, for Sentry monitoring)

### Installation & Startup

```bash
# Install all dependencies for monorepo (root, frontend, backend, shared)
npm install

# Start both servers with hot reload using Turborepo (recommended)
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001

## 🐳 Container Deployment (Docker/Podman)

### Prerequisites
- **Docker** with Docker Compose **OR** **Podman** with podman-compose
- At least 4GB of available RAM (for Sentry services)

### Quick Container Start

```bash
# Using Docker
npm run docker:up

# Using Podman (replace 'docker' with 'podman' in commands)
podman-compose --profile full up -d

# Or build first, then start
npm run docker:build
npm run docker:up
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001  
- **Sentry Dashboard**: http://localhost:9000 (optional monitoring)

### Container Commands

```bash
# Production deployment
npm run docker:up              # Start all services (app + Sentry)
npm run docker:app             # Start only app services (no Sentry)
npm run docker:down            # Stop all services
npm run docker:build           # Build all container images
npm run docker:logs            # View logs from all services

# Development with hot reload
npm run docker:dev             # Start in development mode with hot reload

# Sentry only (monitoring stack)
npm run sentry:up              # Start only Sentry services
npm run sentry:down            # Stop Sentry services
npm run sentry:logs            # View Sentry logs
```

**Using Podman instead of Docker:**
```bash
# Replace npm scripts with direct podman-compose commands
podman-compose --profile full up -d           # Start all services
podman-compose up backend frontend -d         # Start only app services
podman-compose down                           # Stop all services
podman-compose build                          # Build all images
podman-compose logs -f                        # View logs

# Development mode
podman-compose -f docker-compose.yml -f docker-compose.override.yml up
```

### Container Environment Configuration

The docker-compose.yml works out of the box with sensible defaults. **Environment variables are optional** - only configure if needed.

```bash
# Copy environment template (optional - only for Sentry)
copy .env.example .env         # Windows
# cp .env.example .env         # Linux/Mac

# Edit .env file to configure Sentry (optional)
# - Set BACKEND_SENTRY_DSN and FRONTEND_SENTRY_DSN for error tracking
# - Change SENTRY_SECRET_KEY for production security
```

**Deployment modes:**
- **Production**: `npm run docker:up` or `podman-compose --profile full up -d`
- **Development**: `npm run docker:dev` or `podman-compose -f docker-compose.yml -f docker-compose.override.yml up`
- **App only**: `npm run docker:app` or `podman-compose up backend frontend -d`
- **Sentry only**: `npm run sentry:up` or `podman-compose --profile sentry up -d`

### Container vs Local Development

| Aspect | Container Deployment | Local Development |
|--------|---------------------|-------------------|
| **Setup** | `npm run docker:up` or `podman-compose up` | `npm install && npm run dev` |
| **Environment** | Containerized, production-like | Native Node.js |
| **Hot Reload** | Available with development mode | Built-in with `npm run dev` |
| **Sentry** | Included with monitoring stack | Optional, requires separate setup |
| **Resources** | ~4GB RAM (with Sentry) | ~500MB RAM |
| **Dependencies** | Docker/Podman + Compose | Node.js 18+ |

### Container Architecture

The single `docker-compose.yml` uses **profiles** and **override files** for different deployment scenarios:

```
┌─────────────────────────────────────────────────────────┐
│                docker-compose.yml (base)                │
├─────────────────────────────────────────────────────────┤
│  + docker-compose.override.yml (development)           │
│  → Hot reload + development mode                        │
├─────────────────────────────────────────────────────────┤
│  + --profile full (production)                         │
│  → Frontend + Backend + Sentry Stack                   │
├─────────────────────────────────────────────────────────┤
│  + --profile sentry (monitoring only)                  │
│  → Redis + PostgreSQL + Sentry Services                │
└─────────────────────────────────────────────────────────┘
```
### Individual Package Commands

```bash
# Run specific package commands using Turborepo filters
npm run dev:frontend                        # Frontend only (localhost:3000)
npm run dev:backend                         # Backend only (localhost:3001)

# Alternative workspace commands
npm run dev --workspace=packages/backend    # Backend only
npm run dev --workspace=packages/frontend   # Frontend only

# Production builds using Turborepo
npm run build                               # Build all packages
npm run build:frontend                      # Build frontend only
npm run build:backend                       # Build backend only
```

## 🔥 Hot Reload

Both frontend and backend support hot reload for rapid development:

- **Backend Hot Reload**: `nodemon` watches TypeScript files and auto-restarts server
- **Frontend Hot Reload**: React's built-in HMR updates components without page refresh
- **Shared Types**: Changes in `shared/types.ts` trigger rebuilds in both frontend and backend

## 📊 Monitoring with Sentry

The application includes comprehensive monitoring with self-hosted Sentry:

### Features
- **Error Tracking**: Automatic capture of frontend and backend errors
- **Performance Monitoring**: API response times, typing accuracy metrics
- **Session Replay**: Record user sessions for debugging
- **Custom Metrics**: Game-specific performance indicators
- **Real-time Alerts**: Game crashes, connection issues

### Setup
See [SENTRY_SETUP.md](./SENTRY_SETUP.md) for detailed Sentry configuration instructions.

Quick setup:
```bash
# Start self-hosted Sentry
docker-compose -f docker-compose.sentry.yml up -d

# Configure environment variables (see SENTRY_SETUP.md)
copy packages\backend\.env.example packages\backend\.env      # Windows
copy packages\frontend\.env.example packages\frontend\.env    # Windows

# Or on Linux/Mac:
# cp packages/backend/.env.example packages/backend/.env
# cp packages/frontend/.env.example packages/frontend/.env

# Update DSN values in .env files
```

## 🏛️ Architecture Comparison

| Architecture Style | TypeRacer Implementation | Advantages | Trade-offs |
|-------------------|-------------------------|------------|------------|
| **Layered Monolith** | ✅ Current approach | Clear separation, single deployment, maintainable | Can become rigid, scaling limitations |
| **Microservices** | ❌ Single backend service | Better scalability, technology diversity | More complex deployment, network overhead |
| **Modular Monolith** | ⚠️ Partially (component modules) | Better organization than monolith | Still single deployment unit |
| **Event-Driven** | ✅ Socket.IO events | Loose coupling, real-time responsiveness | Event complexity, debugging challenges |
| **Pipeline** | ❌ Not batch processing | Great for data transformation | Not suitable for real-time interaction |

**Why Layered Monolith Works Well:**
- **Real-time Requirements**: Socket.IO perfect for multiplayer typing races
- **Type Safety**: Shared TypeScript types ensure consistency across layers
- **Development Speed**: Hot reload on both frontend and backend
- **Simple Deployment**: Single backend service, easy to deploy and monitor
- **Clear Boundaries**: Well-defined layers (Presentation, API, Business, Data)

## 🎨 BC Government Design System

This application leverages the **BC Government Design System** to ensure consistent, accessible, and government-standard user interfaces:

### Design System Components Used
- **@bcgov/design-system-react-components**: React component library for BC Gov standard UI elements
- **@bcgov/design-tokens**: Design tokens for consistent spacing, colors, typography
- **@bcgov/bc-sans**: Official BC Government font family

## 🏗️ Monorepo vs Conventional Structure

### Current Monorepo Architecture (Turborepo)

This project uses a **monorepo structure** managed by Turborepo for efficient development and deployment:

```
typeracer-monorepo/
├── packages/
│   ├── frontend/           # React TypeScript app
│   ├── backend/            # Node.js Express API
│   └── shared/             # Shared TypeScript types
├── turbo.json              # Turborepo configuration
└── package.json            # Root workspace configuration
```

### Monorepo Benefits ✅

| Aspect | Monorepo Advantage | Impact |
|--------|-------------------|---------|
| **Type Safety** | Shared types across frontend/backend | Eliminates API contract mismatches |
| **Development** | Single `npm run dev` starts everything | Faster iteration cycles |
| **Code Sharing** | Reusable utilities and types | Reduced duplication |
| **Versioning** | Synchronized releases | No version compatibility issues |
| **Refactoring** | Cross-package changes in single PR | Easier large-scale changes |
| **Dependencies** | Centralized dependency management | Consistent versions across packages |

## 🛠️ Development

### Environment Variables

Environment variables are **optional for basic local development**. The application works with smart defaults:

- **Backend**: Runs on port `3001` by default
- **Frontend**: Connects to `localhost:3001` by default  
- **Sentry**: Gracefully skipped if not configured

**Create `.env` files only if you need to:**
- Enable Sentry monitoring
- Change default ports or API URLs
- Configure for production deployment

**Optional setup:**
- `packages/backend/.env` (from `packages/backend/.env.example`)
- `packages/frontend/.env` (from `packages/frontend/.env.example`)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the Apache License.
