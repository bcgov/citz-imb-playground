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

### Secondary Patterns
- **Component-Based Architecture**: React functional components with hooks
- **Event-Driven Architecture**: Socket.IO for real-time event handling
- **Modular Architecture**: Clear separation of routes, services, and components
- **Client-Server Architecture**: Traditional separation with real-time enhancements

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

## ✨ Features

### Core Functionality
- **Host Games**: Create typing competitions with custom text sources
- **Join Games**: Enter existing games using room codes
- **Real-time Multiplayer**: Live player updates and synchronized gameplay
- **File Upload**: Support for multiple file types (.txt, .js, .ts, .py, .java, .cpp, .html, .css, .json, .md)
- **Performance Tracking**: WPM calculation, accuracy tracking, and live leaderboards
- **Game States**: Waiting → Countdown → Active → Finished with proper state management

### Technical Features
- **Full TypeScript**: End-to-end type safety with shared interfaces
- **Socket.IO Integration**: Seamless real-time communication
- **Error Handling**: Comprehensive error handling and user feedback
- **Responsive Design**: Works on desktop and mobile devices
- **Hot Module Replacement**: Fast development workflow

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

### Benefits
- **Accessibility**: WCAG 2.1 AA compliant components out of the box
- **Consistency**: Standardized look and feel across BC Government applications
- **Efficiency**: Pre-built, tested components reduce development time
- **Compliance**: Meets BC Government digital standards and branding guidelines

### Implementation
The design system is integrated at the component level, providing:
- Consistent button styles and interactions
- Standardized form elements and validation
- Accessible color schemes and typography
- Responsive layout components

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

### Conventional Structure Comparison

**Conventional Separate Repositories:**
```
typeracer-frontend/         # Separate repo
typeracer-backend/          # Separate repo  
typeracer-shared/           # Separate npm package
```

### Trade-offs Analysis

| Factor | Monorepo | Conventional Repos |
|--------|----------|-------------------|
| **Setup Complexity** | Medium (Turborepo config) | Low (standard npm) |
| **CI/CD** | Complex (affected packages) | Simple (per repo) |
| **Team Coordination** | Easier (single repo) | Harder (multiple repos) |
| **Deployment** | Coordinated releases | Independent releases |
| **Repository Size** | Larger (all code) | Smaller (focused) |
| **Build Performance** | Optimized (Turborepo cache) | Standard |

### Why Monorepo Works for TypeRacer

1. **Real-time Coordination**: Frontend/backend must stay synchronized for Socket.IO events
2. **Shared Game Logic**: Game state interfaces used by both client and server
3. **Rapid Prototyping**: Quick feature development across full stack
4. **Type Safety**: Immediate feedback when API contracts change
5. **Single Deployment**: Simplified hosting and environment management

**Recommendation**: Monorepo is ideal for tightly coupled applications like real-time games where frontend and backend evolve together.

## 📁 Project Structure

```
typeracer-monorepo/
├── packages/
│   ├── frontend/                # React TypeScript frontend
│   │   ├── src/
│   │   │   ├── components/     # Reusable UI components
│   │   │   │   ├── game/      # Game-specific components (composed architecture)
│   │   │   │   ├── home/      # Home page components  
│   │   │   │   └── host/      # Host-specific components
│   │   │   ├── pages/         # Route components
│   │   │   ├── config/        # Configuration (Sentry, etc.)
│   │   │   └── types/         # Frontend-specific types
│   │   └── package.json       # Frontend dependencies
│   ├── backend/                # Node.js TypeScript backend
│   │   ├── src/
│   │   │   ├── routes/        # Express route handlers
│   │   │   ├── services/      # Business logic
│   │   │   ├── socket/        # Socket.IO handlers
│   │   │   ├── config/        # Configuration (Sentry, etc.)
│   │   │   └── types/         # Backend-specific types
│   │   └── package.json       # Backend dependencies
│   └── shared/                 # Shared TypeScript types
│       └── types.ts           # Cross-package type definitions
├── turbo.json                  # Turborepo build configuration
├── docker-compose.sentry.yml   # Self-hosted Sentry setup
├── SENTRY_SETUP.md            # Sentry configuration guide
└── package.json               # Root workspace with scripts
```

## 🛠️ Development

### Available Scripts

```bash
# Development (Turborepo orchestration)
npm run dev              # Start all packages in development mode
npm run dev:frontend     # Start frontend only (localhost:3000)
npm run dev:backend      # Start backend only (localhost:3001)
npm run build           # Build all packages for production
npm run build:frontend  # Build frontend only
npm run build:backend   # Build backend only
npm run test            # Run tests across all packages
npm run lint            # Lint all packages
npm run clean           # Clean build artifacts
npm run format          # Format code across all packages

# Monitoring
npm run sentry:up       # Start self-hosted Sentry stack
npm run sentry:down     # Stop Sentry stack
npm run sentry:logs     # View Sentry logs

# Docker (if using containerization)
npm run docker:up       # Start application in Docker
npm run docker:down     # Stop Docker containers

# Alternative package-specific commands
npm run dev --workspace=packages/frontend   # Frontend only
npm run dev --workspace=packages/backend    # Backend only
npm run build --filter=frontend             # Build frontend only
npm run build --filter=backend              # Build backend only
```

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

**Quick setup commands:**
```bash
# Windows (only if you want Sentry monitoring)
copy packages\backend\.env.example packages\backend\.env
copy packages\frontend\.env.example packages\frontend\.env

# Linux/Mac (only if you want Sentry monitoring)
cp packages/backend/.env.example packages/backend/.env
cp packages/frontend/.env.example packages/frontend/.env
```

## 🎮 How to Play

1. **Host a Game**:
   - Enter your username
   - Choose between default text or upload a custom file
   - Click "Create Room" to generate a room code

2. **Join a Game**:
   - Enter your username and the room code
   - Click "Join Game"

3. **Compete**:
   - Wait for other players to join
   - Host starts the game when ready
   - Type the displayed text as fast and accurately as possible
   - View real-time results and final rankings

## 🔧 Technical Details

### Frontend Stack
- React 18 with TypeScript
- React Router for navigation
- Socket.IO client for real-time communication
- **BC Government Design System** (@bcgov/design-system-react-components)
- **BC Sans Font** (@bcgov/bc-sans) and Design Tokens (@bcgov/design-tokens)
- Styled Components for custom styling
- Sentry for error tracking and performance monitoring

### Backend Stack
- Node.js with Express and TypeScript
- Socket.IO for real-time communication
- Multer for file uploads
- CORS for cross-origin requests
- Sentry for error tracking and performance monitoring

### Monorepo Infrastructure
- **Turborepo** for build orchestration and caching
- **npm workspaces** for dependency management
- **Shared TypeScript types** for cross-package consistency
- **Coordinated development** with hot reload across packages

### Real-time Features
- Live player status updates
- Synchronized game countdown
- Real-time typing progress
- Instant result updates
- Connection status monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the Apache License.
