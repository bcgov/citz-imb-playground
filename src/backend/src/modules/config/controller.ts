import { Request, Response } from 'express';
import {
  errorWrapper,
  getLatestPackageVersions,
  getPackageVersions,
  getPackageIssues,
} from '../../utils';

import config from '../../config';
const { ENVIRONMENT, DEBUG, VERBOSE_DEBUG } = config;

/**
 * Provide configuration variables to the frontend.
 * @method GET
 * @route /config
 */
export const getConfig = errorWrapper(async (req: Request, res: Response) => {
  const packageVersions = getPackageVersions();
  const latestPackageVersions = await getLatestPackageVersions();
  const packageIssues = await getPackageIssues();

  const configuration = {
    ENVIRONMENT,
    DEBUG,
    VERBOSE_DEBUG,
    packageVersions,
    latestPackageVersions,
    packageIssues,
  };
  res.json(configuration);
});
