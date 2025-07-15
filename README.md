# IMB Playground: TypeRacer - Real-time Multiplayer Typing Competition

Please note this repositry is created to conduct PoC and experiment on new features/technologies. 

This is a TypeScript-based web application where users can host and join typing competitions to compete on speed and accuracy.

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
# Install all dependencies for root, frontend, and backend
npm run install:all

# Start both servers with hot reload (recommended)
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001

### Individual Commands

```bash
# Backend only (runs on http://localhost:3001)
npm run backend:dev

# Frontend only (runs on http://localhost:3000)
npm run frontend:dev

# Production builds
npm run build
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
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

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

## 📁 Project Structure

```
typeracer/
├── frontend/                 # React TypeScript frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── game/       # Game-specific components (composed architecture)
│   │   │   ├── home/       # Home page components
│   │   │   └── host/       # Host-specific components
│   │   ├── pages/          # Route components
│   │   ├── config/         # Configuration (Sentry, etc.)
│   │   └── types/          # Frontend-specific types
│   └── package.json
├── backend/                  # Node.js TypeScript backend
│   ├── src/
│   │   ├── routes/         # Express route handlers
│   │   ├── services/       # Business logic
│   │   ├── socket/         # Socket.IO handlers
│   │   ├── config/         # Configuration (Sentry, etc.)
│   │   └── types/          # Backend-specific types
│   └── package.json
├── shared/                   # Shared TypeScript types
│   └── types.ts
├── docker-compose.sentry.yml # Self-hosted Sentry setup
├── SENTRY_SETUP.md          # Sentry configuration guide
└── package.json             # Root package with scripts
```

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev              # Start both frontend and backend
npm run backend:dev      # Start backend only
npm run frontend:dev     # Start frontend only

# Building
npm run build           # Build both frontend and backend
npm run frontend:build  # Build frontend only
npm run backend:build   # Build backend only

# Dependencies
npm run install:all     # Install all dependencies
```

### Environment Variables

Create `.env` files from the examples:
- `backend/.env` (from `backend/.env.example`)
- `frontend/.env` (from `frontend/.env.example`)

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
- Styled Components for styling
- Sentry for error tracking and performance monitoring

### Backend Stack
- Node.js with Express and TypeScript
- Socket.IO for real-time communication
- Multer for file uploads
- CORS for cross-origin requests
- Sentry for error tracking and performance monitoring

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
