import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import { keycloak, protectedRoute } from '@bcgov/citz-imb-kc-express';

import { configRouter, cssapiRouter, healthRouter, userRouter } from './modules';
import { apiDocs } from '@bcgov/citz-imb-kc-express-api-docs';

import config from './config';
const { CORS_OPTIONS, RATE_LIMIT_OPTIONS, KEYCLOAK_OPTIONS, API_DOC_CONFIG } = config;

// Define Express App
const app = express();

// Allow frontend use of a proxy (Nginx).
app.set('trust proxy', 1);

// Initialize keycloak integration.
keycloak(app, KEYCLOAK_OPTIONS);

/**
 * Middleware for parsing request bodies.
 * @module body-parser
 * @property {Function} urlencodedParser - Middleware for parsing URL-encoded data from the request body.
 * @property {Function} jsonParser - Middleware for parsing JSON data from the request body.
 */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors(CORS_OPTIONS));
app.use(rateLimit(RATE_LIMIT_OPTIONS));
app.use(cookieParser());

// Disabled because it exposes information about the used framework to potential attackers.
app.disable('x-powered-by');

// Routing
app.use('/health', healthRouter);
app.use('/config', configRouter);
app.use('/cssapi', protectedRoute(['playground-admin']), cssapiRouter);
app.use('/user', protectedRoute(), userRouter);

// Initialize api docs
apiDocs(app, API_DOC_CONFIG);

export default app;
