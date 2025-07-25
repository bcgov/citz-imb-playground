import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

export const initSentry = () => {
  if (!process.env.SENTRY_DSN) {
    console.log('⚠️  Sentry DSN not configured, skipping Sentry initialization');
    return;
  }

  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.SENTRY_ENVIRONMENT || 'development',
    release: process.env.SENTRY_RELEASE || 'typeracer-backend@1.0.0',
    debug: process.env.SENTRY_DEBUG === 'true',
    
    // Performance Monitoring
    tracesSampleRate: parseFloat(process.env.SENTRY_TRACES_SAMPLE_RATE || '1.0'),
    
    // Profiling
    profilesSampleRate: 1.0,
    
    integrations: [
      // Enable HTTP calls tracing
      Sentry.httpIntegration(),
      // Enable Express.js middleware tracing
      Sentry.expressIntegration(),
      // Enable profiling
      nodeProfilingIntegration(),
    ],

    // Custom error filtering
    beforeSend(event: Sentry.ErrorEvent, hint: Sentry.EventHint) {
      // Filter out certain errors if needed
      if (event.exception) {
        const error = hint.originalException;
        if (error && typeof error === 'object' && 'code' in error) {
          // Skip common network errors
          if (['ECONNRESET', 'ENOTFOUND', 'ECONNREFUSED'].includes(error.code as string)) {
            return null;
          }
        }
      }
      return event;
    },

    // Set user context
    initialScope: {
      tags: {
        component: 'backend',
        service: 'typeracer-api'
      }
    }
  });

  console.log('✅ Sentry initialized for backend');
};

// Helper function to capture custom events
export const captureGameEvent = (eventName: string, data: any) => {
  Sentry.addBreadcrumb({
    message: eventName,
    category: 'game',
    data,
    level: 'info'
  });
};

// Helper function to set user context
export const setSentryUser = (userId: string, username?: string) => {
  Sentry.setUser({
    id: userId,
    username: username || 'anonymous'
  });
};

// Helper function to capture performance
export const capturePerformance = (name: string, operation: () => Promise<any>) => {
  return Sentry.startSpan({ name, op: 'function' }, async () => {
    return await operation();
  });
};
