import { Request, Response } from 'express';
import { errorWrapper, getParams, getQuery } from '../../../utils';
import {
  getAzureIDIRUsers,
  getIDIRUsers,
  getGitHubBCGovUsers,
  getGitHubPublicUsers,
  getBasicBCeIDUser,
  getBusinessBCeIDUser,
  getBothBCeIDUser,
} from '@bcgov/citz-imb-kc-css-api';
import { getGitHubUserQuerySchema, getIDIRUserQuerySchema, guidPathParamsSchema } from './schemas';

/**
 * Get a list of IDIR users in the Keycloak integration.
 * @method GET
 * @route /cssapi/user/idir-user
 * @protected Requires "playground-admin"
 */
export const getKCIDIRUser = errorWrapper(async (req: Request, res: Response) => {
  const user = getQuery(req, getIDIRUserQuerySchema);

  res.json(await getIDIRUsers(user));
});

/**
 * Get a list of Azure IDIR users in the Keycloak integration.
 * @method GET
 * @route /cssapi/user/azure-user
 * @protected Requires "playground-admin"
 */
export const getKCAzureIDIRUser = errorWrapper(async (req: Request, res: Response) => {
  const user = getQuery(req, getIDIRUserQuerySchema);

  res.json(await getAzureIDIRUsers(user));
});

/**
 * Get a list of GitHub (BCGov) users in the Keycloak integration.
 * @method GET
 * @route /cssapi/user/github/bcgov
 * @protected Requires "playground-admin"
 */
export const getKCGitHubBCGovUsers = errorWrapper(async (req: Request, res: Response) => {
  const user = getQuery(req, getGitHubUserQuerySchema);

  res.json(await getGitHubBCGovUsers(user));
});

/**
 * Get a list of GitHub (Public) users in the Keycloak integration.
 * @method GET
 * @route /cssapi/user/github/public
 * @protected Requires "playground-admin"
 */
export const getKCGitHubPublicUsers = errorWrapper(async (req: Request, res: Response) => {
  const user = getQuery(req, getGitHubUserQuerySchema);

  res.json(await getGitHubPublicUsers(user));
});

/**
 * Get a BCeID (Basic) user in the Keycloak integration.
 * @method GET
 * @route /cssapi/user/bceid/basic/:guid
 * @protected Requires "playground-admin"
 */
export const getKCBasicBCeIDUser = errorWrapper(async (req: Request, res: Response) => {
  const { guid } = getParams(req, guidPathParamsSchema);

  res.json(await getBasicBCeIDUser(guid));
});

/**
 * Get a BCeID (Business) user in the Keycloak integration.
 * @method GET
 * @route /cssapi/user/bceid/business/:guid
 * @protected Requires "playground-admin"
 */
export const getKCBusinessBCeIDUser = errorWrapper(async (req: Request, res: Response) => {
  const { guid } = getParams(req, guidPathParamsSchema);

  res.json(await getBusinessBCeIDUser(guid));
});

/**
 * Get a BCeID (Basic & Business) user in the Keycloak integration.
 * @method GET
 * @route /cssapi/user/bceid/both/:guid
 * @protected Requires "playground-admin"
 */
export const getKCBothBCeIDUser = errorWrapper(async (req: Request, res: Response) => {
  const { guid } = getParams(req, guidPathParamsSchema);

  res.json(await getBothBCeIDUser(guid));
});
