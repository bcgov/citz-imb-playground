import { Request, Response } from 'express';
import {
  errorWrapper,
  getLatestPackageVersions,
  getPackageVersions,
  debugController,
} from '../../utils';

import config from '../../config';
const { ENVIRONMENT, DEBUG } = config;

/**
 * Provide configuration variables to the frontend.
 * @method GET
 * @route /config
 */
export const getConfig = errorWrapper(async (req: Request, res: Response) => {
  debugController('getConfig', 'config');

  const packageVersions = getPackageVersions();
  const latestPackageVersions = await getLatestPackageVersions();

  const configuration = {
    ENVIRONMENT,
    DEBUG,
    packageVersions,
    latestPackageVersions,
  };
  res.json(configuration);
});
