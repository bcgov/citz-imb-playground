# Sentry Integration Setup Guide

This guide explains how to set up self-hosted Sentry for monitoring the TypeRacer application.

> **Note**: This application uses a monorepo structure with Turborepo. All backend and frontend code is located in the `packages/` directory.

## 🚀 Quick Start

### 1. Start Self-Hosted Sentry

```bash
# Start Sentry services
docker-compose -f docker-compose.sentry.yml up -d

# Wait for services to be ready (this may take a few minutes)
docker-compose -f docker-compose.sentry.yml logs -f sentry-web
```

### 2. Initial Sentry Setup

1. Open http://localhost:9000 in your browser
2. Create an admin account
3. Create a new organization and project
4. Get your DSN from Project Settings > Client Keys (DSN)

### 3. Configure Environment Variables

#### Backend Configuration
Copy `packages/backend/.env.example` to `packages/backend/.env` and update:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Sentry Configuration
SENTRY_DSN=http://your-actual-dsn-here@localhost:9000/1
SENTRY_ENVIRONMENT=development
SENTRY_RELEASE=typeracer-backend@1.0.0
SENTRY_TRACES_SAMPLE_RATE=1.0
SENTRY_DEBUG=true

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

#### Frontend Configuration
Copy `packages/frontend/.env.example` to `packages/frontend/.env` and update:

```env
# React App Configuration
REACT_APP_API_URL=http://localhost:3001
REACT_APP_SOCKET_URL=http://localhost:3001

# Sentry Configuration
REACT_APP_SENTRY_DSN=http://your-actual-dsn-here@localhost:9000/2
REACT_APP_SENTRY_ENVIRONMENT=development
REACT_APP_SENTRY_RELEASE=typeracer-frontend@0.1.0
REACT_APP_SENTRY_TRACES_SAMPLE_RATE=1.0
REACT_APP_SENTRY_DEBUG=true
```

### 4. Start the Application

```bash
# Install dependencies for the monorepo
npm install

# Start both frontend and backend with hot reload using Turborepo
npm run dev
```

## 📊 Monitoring Features

### Backend Monitoring
- **Error Tracking**: Automatic capture of server errors and exceptions
- **Performance Monitoring**: API endpoint response times and database queries
- **Socket.IO Events**: Real-time game event tracking
- **Custom Metrics**: Game-specific performance indicators

### Frontend Monitoring
- **Error Boundaries**: React error capture with user-friendly fallbacks
- **Performance Tracking**: Page load times and user interactions
- **Session Replay**: Record user sessions for debugging (10% sample rate)
- **Typing Metrics**: Custom WPM, accuracy, and error tracking

### Custom Events
The application captures custom events for:
- Game creation and joining
- Typing performance metrics (WPM, accuracy, duration)
- User interactions and navigation
- Socket connection events

## 🔧 Configuration Options

### Sampling Rates
- **Error Sampling**: 100% (all errors captured)
- **Performance Sampling**: 100% (all transactions traced)
- **Session Replay**: 10% normal sessions, 100% error sessions

### Custom Filtering
- Network errors (ECONNRESET, ENOTFOUND) are filtered out
- React development warnings are excluded
- Custom error filtering can be added in the `beforeSend` hooks

## 🛠️ Development vs Production

### Development Settings
- Debug mode enabled for detailed logging
- High sampling rates for comprehensive monitoring
- Source maps enabled for better error tracking

### Production Recommendations
```env
# Reduce sampling rates for production
SENTRY_TRACES_SAMPLE_RATE=0.1
REACT_APP_SENTRY_TRACES_SAMPLE_RATE=0.1
SENTRY_DEBUG=false
REACT_APP_SENTRY_DEBUG=false
```

## 📈 Custom Metrics

### Typing Performance
```typescript
import { captureTypingMetrics } from './config/sentry';

captureTypingMetrics({
  wpm: 75,
  accuracy: 0.95,
  duration: 120,
  errors: 3
});
```

### Game Events
```typescript
import { captureGameEvent } from './config/sentry';

captureGameEvent('game_completed', {
  roomCode: 'ABC123',
  playerCount: 4,
  duration: 180
});
```

### User Context
```typescript
import { setSentryUser } from './config/sentry';

setSentryUser('user123', 'PlayerName');
```

## 🐛 Troubleshooting

### Common Issues

1. **Sentry not initializing**
   - Check that DSN is correctly set in environment variables
   - Verify Sentry server is running on port 9000

2. **No events appearing**
   - Confirm environment variables are loaded
   - Check browser console for Sentry initialization messages
   - Verify project DSN matches configuration

3. **Docker issues**
   - Ensure Docker has enough memory allocated (4GB+ recommended)
   - Check container logs: `docker-compose -f docker-compose.sentry.yml logs`

### Useful Commands

```bash
# Check Sentry container status
docker-compose -f docker-compose.sentry.yml ps

# View Sentry logs
docker-compose -f docker-compose.sentry.yml logs sentry-web

# Restart Sentry services
docker-compose -f docker-compose.sentry.yml restart

# Stop Sentry services
docker-compose -f docker-compose.sentry.yml down
```

## 🔒 Security Notes

- Change the `SENTRY_SECRET_KEY` in production
- Use environment-specific DSNs
- Consider network security for self-hosted instances
- Regularly update Sentry Docker images

## 📚 Additional Resources

- [Sentry Documentation](https://docs.sentry.io/)
- [Self-Hosted Sentry Guide](https://develop.sentry.dev/self-hosted/)
- [React Integration](https://docs.sentry.io/platforms/javascript/guides/react/)
- [Node.js Integration](https://docs.sentry.io/platforms/node/)
