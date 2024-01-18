import { Request } from 'express';

import config from '../config';
const { DEBUG } = config;

export const debugRequest = (req: Request) => {
  if (DEBUG) console.info(`DEBUG: Request made to [${req.method}] ${req.originalUrl}`);
};
