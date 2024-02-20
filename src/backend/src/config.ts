import { KEYCLOAK_OPTIONS } from './keycloak/config';

// Environment variables set in compose file.
const {
  NODE_ENV,
  ENVIRONMENT,
  DEBUG,
  VERBOSE_DEBUG,
  FRONTEND_URL,
  BACKEND_URL,
  PORT,
  PGHOST,
  PGUSER,
  PGPASSWORD,
  PGDATABASE,
} = process.env;

/**
 * Middleware for enabling Cross-Origin Resource Sharing (CORS) on the server.
 * @module cors
 * @property {string|string[]} origin - The allowed origins for CORS requests.
 * @property {boolean} credentials - Whether to allow credentials to be included in CORS requests.
 */
const CORS_OPTIONS = {
  origin: FRONTEND_URL,
  credentials: true,
};

/**
 * Middleware for rate-limiting requests on the server.
 * @module express-rate-limit
 * @property {number} windowMs - The length of the rate-limiting window in milliseconds.
 * @property {number} max - The maximum number of requests allowed per window per IP address.
 * @property {boolean} headers - Whether to include rate limit info in the `RateLimit-*` headers.
 * @property {boolean} legacy - Whether to include rate limit info in the `X-RateLimit-*` headers (deprecated).
 */
const RATE_LIMIT_OPTIONS = {
  windowMs: 2 * 1000, // 2 seconds
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
};

const API_DOC_CONFIG = {
  title: 'Playground API Documentation',
  modules: {
    health: {
      description: 'Check application health.',
    },
    config: {
      description: 'Configuration variables.',
    },
    cssapi: {
      description: 'Interface with the Keycloak Integration through the CSS API.',
    },
    user: {
      description: 'User data.',
    },
  },
  customSchemas: {
    'zodProperty.nonEmptyString': {
      required: true,
      type: 'string',
    },
    'zodProperty.numberQueryParam': {
      required: true,
      type: 'number',
    },
    'zodProperty.optionalNumberQueryParam': {
      required: false,
      type: 'number',
    },
  },
  customControllers: {
    'dataController.getAllItems': {
      description: 'Returns all items.',
    },
    'dataController.getItemByWhere': {
      description: 'Returns an item based on request body.',
    },
    'dataController.updateItemById': {
      description: 'Update an item based on id and request body.',
    },
  },
  customResponseStatuses: {
    'statusCode.OK': 200,
    'statusCode.CREATED': 201,
    'statusCode.ACCEPTED': 202,
    'statusCode.NO_CONTENT': 204,
    'statusCode.NOT_MODIFIED': 304,
    'statusCode.BAD_REQUEST': 400,
    'statusCode.UNAUTHORIZED': 401,
    'statusCode.FORBIDDEN': 403,
    'statusCode.NOT_FOUND': 404,
    'statusCode.IM_A_TEAPOT': 418,
    'statusCode.INTERNAL_SERVER_ERROR': 500,
    'statusCode.NOT_IMPLEMENTED': 501,
    'statusCode.SERVICE_UNAVAIBLABLE': 503,
  },
  defaultResponses: [500],
};

// Exported configuration values.
export default {
  PORT: PORT ?? 3600,
  NODE_VERSION: process.version,
  NODE_ENV,
  DEBUG: DEBUG === 'true',
  VERBOSE_DEBUG: VERBOSE_DEBUG === 'true',
  ENVIRONMENT,
  FRONTEND_URL,
  BACKEND_URL,
  CORS_OPTIONS,
  RATE_LIMIT_OPTIONS,
  KEYCLOAK_OPTIONS,
  API_DOC_CONFIG,
  PGHOST,
  PGUSER,
  PGPASSWORD,
  PGDATABASE,
};
