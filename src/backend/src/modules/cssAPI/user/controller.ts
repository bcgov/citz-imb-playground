import { Request, Response } from 'express';
import { errorWrapper } from '../../../utils';
import { getAzureIDIRUsers, getIDIRUsers, IDIRUserQuery } from '@bcgov/citz-imb-kc-css-api';

/**
 * @method GET
 * @param user - The user info to query.
 * @route /cssapi/idir-user
 * @protected Requires "playground-admin"
 */
export const getKCIDIRUser = errorWrapper(async (req: Request, res: Response) => {
  const user: IDIRUserQuery = {
    firstName: req.query.firstName as string,
  };

  if (!user.firstName || user.firstName === '' || typeof user.firstName !== 'string') {
    res.status(404).send("Missing 'role' in request query.");
    return;
  }

  res.json(await getIDIRUsers(user));
});

/**
 * @method GET
 * @param user - The user info to query.
 * @route /cssapi/azure-user
 * @protected Requires "playground-admin"
 */
export const getKCAzureIDIRUser = errorWrapper(async (req: Request, res: Response) => {
  const user: IDIRUserQuery = {
    firstName: req.query.firstName as string,
  };

  if (!user.firstName || user.firstName === '' || typeof user.firstName !== 'string') {
    res.status(404).send("Missing 'role' in request query.");
    return;
  }

  res.json(await getAzureIDIRUsers(user));
});
