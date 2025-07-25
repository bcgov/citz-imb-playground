# TypeRacer Architecture

## System Overview

```mermaid
graph TB
    subgraph "Frontend (:3000)"
        U[👤 Users] --> B[🌐 Browser]
        B --> F[⚛️ React App]
    end
    
    subgraph "Backend (:3001)"
        F <--> API[🔌 REST API]
        F <--> WS[🔄 WebSocket]
        API --> BE[🖥️ Express Server]
        WS --> BE
    end
    
    subgraph "Business Logic"
        BE --> GS[🎮 GameService]
        BE --> SH[� Socket Handlers]
        BE --> FR[�📁 File Routes]
        BE --> GR[🎯 Game Routes]
    end
    
    subgraph "Data Storage"
        GS --> MEM[💾 In-Memory Maps]
        FR --> DISK[💿 File System]
    end
    
    subgraph "Monitoring (:9000)"
        BE --> SENTRY_BE[📊 Sentry Backend]
        F --> SENTRY_FE[📊 Sentry Frontend]
        SENTRY_BE --> SENTRY_STACK[� Sentry Stack]
        SENTRY_FE --> SENTRY_STACK
    end
    
    subgraph "Sentry Infrastructure"
        SENTRY_STACK --> POSTGRES[(🐘 PostgreSQL)]
        SENTRY_STACK --> REDIS[(🔴 Redis)]
        SENTRY_STACK --> SENTRY_WEB[🌐 Sentry Web UI]
    end

    style F fill:#61dafb,stroke:#333,stroke-width:2px
    style BE fill:#68a063,stroke:#333,stroke-width:2px
    style SENTRY_WEB fill:#b8d7ff,stroke:#333,stroke-width:2px
    style POSTGRES fill:#5196f0,stroke:#333,stroke-width:2px
    style REDIS fill:#dc382d,stroke:#333,stroke-width:2px
```

## Tech Stack

```mermaid
graph TB
    subgraph "Monorepo Structure"
        ROOT[📦 Root Package]
        TURBO[⚡ Turborepo]
        ROOT --> TURBO
    end
    
    subgraph "Frontend Package"
        REACT[⚛️ React 18]
        TS_FE[📘 TypeScript]
        ROUTER[🛣️ React Router]
        SOCKET_CLIENT[🔌 Socket.IO Client]
        BC_DESIGN[🎨 BC Gov Design System]
        SENTRY_REACT[📊 @sentry/react]
        
        REACT --> TS_FE
        REACT --> ROUTER
        REACT --> SOCKET_CLIENT
        REACT --> BC_DESIGN
        REACT --> SENTRY_REACT
    end
    
    subgraph "Backend Package"
        NODE[🟢 Node.js]
        EXPRESS[🚂 Express.js]
        TS_BE[📘 TypeScript]
        SOCKET_SERVER[🔌 Socket.IO Server]
        MULTER[📎 Multer]
        CORS[🌐 CORS]
        SENTRY_NODE[📊 @sentry/node]
        NODEMON[🔄 Nodemon]
        
        NODE --> EXPRESS
        NODE --> TS_BE
        EXPRESS --> SOCKET_SERVER
        EXPRESS --> MULTER
        EXPRESS --> CORS
        EXPRESS --> SENTRY_NODE
        NODE --> NODEMON
    end
    
    subgraph "Shared Package"
        SHARED_TYPES[🔗 Shared Types]
        INTERFACES[📋 Interfaces]
        
        SHARED_TYPES --> INTERFACES
        TS_FE -.-> SHARED_TYPES
        TS_BE -.-> SHARED_TYPES
    end
    
    subgraph "Infrastructure"
        DOCKER[🐳 Docker Compose]
        POSTGRES_SENTRY[🐘 PostgreSQL]
        REDIS_SENTRY[🔴 Redis]
        SENTRY_SELF[🏠 Self-Hosted Sentry]
        
        DOCKER --> SENTRY_SELF
        SENTRY_SELF --> POSTGRES_SENTRY
        SENTRY_SELF --> REDIS_SENTRY
    end

    TURBO --> REACT
    TURBO --> NODE
    ROOT --> SHARED_TYPES

    style REACT fill:#61dafb,stroke:#333,stroke-width:2px
    style NODE fill:#68a063,stroke:#333,stroke-width:2px
    style EXPRESS fill:#000000,stroke:#333,stroke-width:2px,color:#fff
    style SENTRY_SELF fill:#362d59,stroke:#333,stroke-width:2px,color:#fff
    style DOCKER fill:#2496ed,stroke:#333,stroke-width:2px,color:#fff
    style TURBO fill:#ef4444,stroke:#333,stroke-width:2px,color:#fff
```

## Data Flow

```mermaid
sequenceDiagram
    participant U as 👤 User
    participant F as ⚛️ Frontend
    participant API as 🔌 REST API
    participant WS as 🔄 WebSocket
    participant BE as 🖥️ Backend
    participant GS as 🎮 Game Service
    participant S as 📊 Sentry

    Note over U,S: Game Creation Flow
    U->>F: Create Game
    F->>API: POST /api/games/create
    API->>BE: Process Request
    BE->>GS: Create Room
    GS->>BE: Return Room Code
    BE->>S: Track Game Created
    BE->>API: Return Response
    API->>F: Room Code
    F->>U: Display Room Code

    Note over U,S: Real-time Game Flow
    U->>F: Join Game
    F->>WS: join-room event
    WS->>BE: Handle Join
    BE->>GS: Add Participant
    BE->>S: Track Player Joined
    BE->>WS: Broadcast Updates
    WS->>F: room-joined event
    F->>U: Show Game Lobby

    Note over U,S: Typing Performance
    U->>F: Type Text
    F->>F: Calculate WPM/Accuracy
    F->>S: Track Typing Metrics
    F->>WS: typing-progress event
    WS->>BE: Update Progress
    BE->>GS: Store Progress
    BE->>WS: Broadcast Progress
    WS->>F: player-progress event
    F->>U: Update Leaderboard
```

## Frontend Components

```mermaid
graph TB
    subgraph "App Structure"
        APP[📱 App.tsx]
        ROUTER[🛣️ React Router]
        HEADER[📋 BC Gov Header]
        FOOTER[📋 BC Gov Footer]
        ERROR_BOUNDARY[🛡️ Sentry Error Boundary]
    end

    subgraph "Pages"
        HOME[🏠 HomePage]
        GAME[🎮 GamePage]
    end

    subgraph "Home Components"
        HOST[🎯 HostGame]
        JOIN[🔗 JoinGame]
        UPLOAD[📁 FileUpload]
    end

    subgraph "Game Components"
        LOBBY[🏛️ GameLobby]
        TYPING[⌨️ TypingInterface]
        RESULTS[🏆 GameResults]
    end

    subgraph "Typing Sub-Components"
        TEXT_DISPLAY[📝 TextDisplay]
        TYPING_AREA[⌨️ TypingArea]
        LEADERBOARD[📊 Leaderboard]
    end

    subgraph "Results Sub-Components"
        CELEBRATION[🎉 CelebrationHeader]
        PERSONAL_STATS[📈 PersonalStats]
        FINAL_LEADERBOARD[🏅 FinalLeaderboard]
    end

    subgraph "Utilities"
        USERNAME_VALIDATION[✅ Username Validation]
        SOCKET_CONFIG[🔌 Socket Config]
        SENTRY_CONFIG[📊 Sentry Config]
    end

    APP --> ERROR_BOUNDARY
    ERROR_BOUNDARY --> ROUTER
    ROUTER --> HEADER
    ROUTER --> HOME
    ROUTER --> GAME
    ROUTER --> FOOTER

    HOME --> HOST
    HOME --> JOIN
    HOST --> UPLOAD

    GAME --> LOBBY
    GAME --> TYPING
    GAME --> RESULTS

    TYPING --> TEXT_DISPLAY
    TYPING --> TYPING_AREA
    TYPING --> LEADERBOARD

    RESULTS --> CELEBRATION
    RESULTS --> PERSONAL_STATS
    RESULTS --> FINAL_LEADERBOARD

    JOIN --> USERNAME_VALIDATION
    TYPING --> SOCKET_CONFIG
    APP --> SENTRY_CONFIG
```

## Layered Architecture

```mermaid
graph TB
    subgraph "Frontend Layer"
        UI[🎨 React Components]
        PAGES[📄 Pages]
        HOOKS[🪝 React Hooks]
        STATE[🔄 State Management]
    end
    
    subgraph "API Layer"
        REST[🌐 REST Routes]
        WEBSOCKET[🔌 WebSocket Events]
        MIDDLEWARE[⚙️ Express Middleware]
        CORS_MW[🌐 CORS Middleware]
    end
    
    subgraph "Business Logic Layer"
        GAME_SERVICE[🎮 GameService]
        SOCKET_HANDLERS[🔌 Socket Handlers]
        GAME_ROUTES[🎯 Game Routes]
        FILE_ROUTES[� File Routes]
    end
    
    subgraph "Data Layer"
        MEMORY_MAPS[💾 In-Memory Maps]
        FILE_SYSTEM[💿 File System (uploads/)]
        SHARED_TYPES[🔗 Shared Types]
    end
    
    subgraph "Infrastructure Layer"
        HTTP_SERVER[🖥️ HTTP Server]
        SOCKET_IO[🔌 Socket.IO Server]
        SENTRY_MONITORING[📊 Sentry Monitoring]
        NODEMON[� Nodemon (dev)]
    end

    UI --> REST
    PAGES --> WEBSOCKET
    
    REST --> GAME_ROUTES
    REST --> FILE_ROUTES
    WEBSOCKET --> SOCKET_HANDLERS
    REST --> CORS_MW
    
    GAME_ROUTES --> GAME_SERVICE
    SOCKET_HANDLERS --> GAME_SERVICE
    FILE_ROUTES --> FILE_SYSTEM
    
    GAME_SERVICE --> MEMORY_MAPS
    GAME_SERVICE --> SHARED_TYPES
    
    MEMORY_MAPS --> HTTP_SERVER
    FILE_SYSTEM --> HTTP_SERVER
    HTTP_SERVER --> SOCKET_IO
    HTTP_SERVER --> SENTRY_MONITORING
    HTTP_SERVER --> NODEMON

    style UI fill:#e1f5fe
    style GAME_SERVICE fill:#f3e5f5
    style MEMORY_MAPS fill:#fff3e0
    style HTTP_SERVER fill:#e8f5e8
```

## Real-time Communication

```mermaid
graph LR
    subgraph "Client Side"
        REACT_APP[⚛️ React App]
        SOCKET_CLIENT[🔌 Socket.IO Client]
        UI_COMPONENTS[🎨 UI Components]
        
        REACT_APP --> SOCKET_CLIENT
        SOCKET_CLIENT --> UI_COMPONENTS
    end
    
    subgraph "Network Layer"
        WEBSOCKET[🌐 WebSocket Connection]
        HTTP[📡 HTTP/HTTPS]
        
        SOCKET_CLIENT <--> WEBSOCKET
        REACT_APP <--> HTTP
    end
    
    subgraph "Server Side"
        EXPRESS_SERVER[🚂 Express Server]
        SOCKET_SERVER[🔌 Socket.IO Server]
        GAME_LOGIC[🎮 Game Logic]
        
        HTTP <--> EXPRESS_SERVER
        WEBSOCKET <--> SOCKET_SERVER
        SOCKET_SERVER --> GAME_LOGIC
    end
    
    subgraph "Events"
        CLIENT_EVENTS[📤 Client Events<br/>• join-room<br/>• typing-progress<br/>• start-game]
        SERVER_EVENTS[📥 Server Events<br/>• room-joined<br/>• player-progress<br/>• game-started]
        
        SOCKET_CLIENT --> CLIENT_EVENTS
        SERVER_EVENTS --> SOCKET_CLIENT
        CLIENT_EVENTS --> SOCKET_SERVER
        SOCKET_SERVER --> SERVER_EVENTS
    end

    style WEBSOCKET fill:#4caf50,stroke:#333,stroke-width:2px,color:#fff
    style CLIENT_EVENTS fill:#2196f3,stroke:#333,stroke-width:2px,color:#fff
    style SERVER_EVENTS fill:#ff9800,stroke:#333,stroke-width:2px,color:#fff
```

## Monitoring

```mermaid
graph TB
    subgraph "Application Layer"
        FE[⚛️ Frontend App]
        BE[🖥️ Backend App]
    end
    
    subgraph "Sentry SDKs"
        FE_SDK[📊 @sentry/react]
        BE_SDK[📊 @sentry/node]
        
        FE --> FE_SDK
        BE --> BE_SDK
    end
    
    subgraph "Data Collection"
        ERRORS[🚨 Error Tracking]
        PERFORMANCE[⚡ Performance Monitoring]
        BREADCRUMBS[🍞 Breadcrumbs]
        CUSTOM_METRICS[📈 Custom Metrics]
        
        FE_SDK --> ERRORS
        FE_SDK --> PERFORMANCE
        BE_SDK --> BREADCRUMBS
        BE_SDK --> CUSTOM_METRICS
    end
    
    subgraph "Sentry Infrastructure"
        SENTRY_WEB[🌐 Sentry Web]
        SENTRY_WORKER[⚙️ Sentry Worker]
        SENTRY_CRON[⏰ Sentry Cron]
        
        ERRORS --> SENTRY_WEB
        PERFORMANCE --> SENTRY_WORKER
        BREADCRUMBS --> SENTRY_CRON
        CUSTOM_METRICS --> SENTRY_WEB
    end
    
    subgraph "Storage Layer"
        POSTGRES[🐘 PostgreSQL<br/>Events & Metadata]
        REDIS[🔴 Redis<br/>Cache & Sessions]
        CLICKHOUSE[📊 ClickHouse<br/>Time Series Data]
        
        SENTRY_WEB --> POSTGRES
        SENTRY_WORKER --> REDIS
        SENTRY_CRON --> CLICKHOUSE
    end
    
    subgraph "Observability"
        DASHBOARD[📊 Dashboard]
        ALERTS[🚨 Alerts]
        REPORTS[📋 Reports]
        
        POSTGRES --> DASHBOARD
        REDIS --> ALERTS
        CLICKHOUSE --> REPORTS
    end

    style SENTRY_WEB fill:#362d59,stroke:#333,stroke-width:2px,color:#fff
    style POSTGRES fill:#336791,stroke:#333,stroke-width:2px,color:#fff
    style REDIS fill:#dc382d,stroke:#333,stroke-width:2px,color:#fff
```

## Deployment

```mermaid
graph TB
    subgraph "Development Environment"
        DEV_ROOT[📦 Monorepo Root]
        TURBO_DEV[⚡ Turborepo Dev]
        DEV_FE[⚛️ React Dev Server<br/>:3000]
        DEV_BE[🖥️ Node.js + Nodemon<br/>:3001]
        DEV_SENTRY[📊 Sentry Docker Stack<br/>:9000]
        
        DEV_ROOT --> TURBO_DEV
        TURBO_DEV --> DEV_FE
        TURBO_DEV --> DEV_BE
        DEV_FE <--> DEV_BE
        DEV_BE --> DEV_SENTRY
        DEV_FE --> DEV_SENTRY
    end
    
    subgraph "Build Process"
        BUILD_CMD[🔨 npm run build]
        TURBO_BUILD[⚡ Turborepo Build]
        FE_BUILD[� React Build]
        BE_BUILD[� TypeScript Build]
        
        BUILD_CMD --> TURBO_BUILD
        TURBO_BUILD --> FE_BUILD
        TURBO_BUILD --> BE_BUILD
    end
    
    subgraph "Docker Infrastructure"
        DOCKER_COMPOSE[� Docker Compose]
        SENTRY_CONTAINERS[🐳 Sentry Containers]
        POSTGRES_CONTAINER[� PostgreSQL Container]
        REDIS_CONTAINER[🔴 Redis Container]
        VOLUMES[💾 Docker Volumes]
        
        DOCKER_COMPOSE --> SENTRY_CONTAINERS
        SENTRY_CONTAINERS --> POSTGRES_CONTAINER
        SENTRY_CONTAINERS --> REDIS_CONTAINER
        POSTGRES_CONTAINER --> VOLUMES
        REDIS_CONTAINER --> VOLUMES
    end
    
    subgraph "Package Structure"
        PACKAGES[� packages/]
        FRONTEND_PKG[� frontend/]
        BACKEND_PKG[� backend/]
        SHARED_PKG[📁 shared/]
        
        PACKAGES --> FRONTEND_PKG
        PACKAGES --> BACKEND_PKG
        PACKAGES --> SHARED_PKG
        
        DEV_FE --> FRONTEND_PKG
        DEV_BE --> BACKEND_PKG
        FRONTEND_PKG --> SHARED_PKG
        BACKEND_PKG --> SHARED_PKG
    end

    style TURBO_DEV fill:#ef4444,stroke:#333,stroke-width:2px,color:#fff
    style DOCKER_COMPOSE fill:#2496ed,stroke:#333,stroke-width:2px,color:#fff
    style SENTRY_CONTAINERS fill:#362d59,stroke:#333,stroke-width:2px,color:#fff
```

## Tech Stack
- **Frontend**: React 18 + TypeScript + Socket.IO Client
- **Backend**: Node.js + Express + Socket.IO Server + TypeScript  
- **Monitoring**: Self-hosted Sentry (PostgreSQL + Redis)
- **Infrastructure**: Docker Compose

