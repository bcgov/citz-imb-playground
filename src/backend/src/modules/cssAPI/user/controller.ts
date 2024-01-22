import { Request, Response } from 'express';
import { errorWrapper } from '../../../utils';
import { getAzureIDIRUsers, getIDIRUsers, IDIRUserQuery } from '@bcgov/citz-imb-kc-css-api';

/**
 * @method GET
 * @param user - The user info to query.
 * @route /cssapi/user/idir-user
 * @protected Requires "playground-admin"
 */
export const getKCIDIRUser = errorWrapper(async (req: Request, res: Response) => {
  const user: IDIRUserQuery = {
    firstName: req.query.firstName as string,
    lastName: req.query.lastName as string,
    email: req.query.email as string,
  };

  if (user.firstName === '') delete user.firstName;
  if (user.lastName === '') delete user.lastName;
  if (user.email === '') delete user.email;

  res.json(await getIDIRUsers(user));
});

/**
 * @method GET
 * @param user - The user info to query.
 * @route /cssapi/user/azure-user
 * @protected Requires "playground-admin"
 */
export const getKCAzureIDIRUser = errorWrapper(async (req: Request, res: Response) => {
  const user: IDIRUserQuery = {
    firstName: req.query.firstName as string,
    lastName: req.query.lastName as string,
    email: req.query.email as string,
  };

  if (user.firstName === '') delete user.firstName;
  if (user.lastName === '') delete user.lastName;
  if (user.email === '') delete user.email;

  res.json(await getAzureIDIRUsers(user));
});
