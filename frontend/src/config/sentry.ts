import * as Sentry from '@sentry/react';

export const initSentry = () => {
  if (!process.env.REACT_APP_SENTRY_DSN) {
    console.log('⚠️  Sentry DSN not configured, skipping Sentry initialization');
    return;
  }

  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    environment: process.env.REACT_APP_SENTRY_ENVIRONMENT || 'development',
    release: process.env.REACT_APP_SENTRY_RELEASE || 'typeracer-frontend@0.1.0',
    debug: process.env.REACT_APP_SENTRY_DEBUG === 'true',
    
    // Performance Monitoring
    tracesSampleRate: parseFloat(process.env.REACT_APP_SENTRY_TRACES_SAMPLE_RATE || '1.0'),
    
    integrations: [
      // Browser tracing integration
      Sentry.browserTracingIntegration(),
      // Replay integration for session recording
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],

    // Session Replay
    replaysSessionSampleRate: 0.1, // 10% of sessions will be recorded
    replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors will be recorded

    // Custom error filtering
    beforeSend(event: Sentry.ErrorEvent, hint: Sentry.EventHint) {
      // Filter out certain errors if needed
      if (event.exception) {
        const error = hint.originalException;
        if (error && typeof error === 'object' && 'message' in error) {
          // Skip common React development warnings
          if (typeof error.message === 'string' && error.message.includes('Warning:')) {
            return null;
          }
        }
      }
      return event;
    },

    // Set user context
    initialScope: {
      tags: {
        component: 'frontend',
        service: 'typeracer-ui'
      }
    }
  });

  console.log('✅ Sentry initialized for frontend');
};

// Helper function to capture typing performance metrics
export const captureTypingMetrics = (metrics: {
  wpm: number;
  accuracy: number;
  duration: number;
  errors: number;
}) => {
  Sentry.addBreadcrumb({
    message: 'Typing performance recorded',
    category: 'typing',
    data: metrics,
    level: 'info'
  });

  // Custom metric for performance monitoring
  Sentry.setMeasurement('typing.wpm', metrics.wpm, 'none');
  Sentry.setMeasurement('typing.accuracy', metrics.accuracy, 'ratio');
  Sentry.setMeasurement('typing.duration', metrics.duration, 'second');
};

// Helper function to capture game events
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

// Error boundary component
export const SentryErrorBoundary = Sentry.ErrorBoundary;
