import { Request, Response } from 'express';
import { errorWrapper, getParams, getQuery } from '../../../utils';
import {
  getUserRoles,
  assignUserRoles,
  getUsersWithRole,
  unassignUserRole,
} from '@bcgov/citz-imb-kc-css-api';
import {
  getUsersWithRoleQuerySchema,
  rolePathParamsSchema,
  roleQuerySchema,
  usernamePathParamsSchema,
} from './schemas';

/**
 * Get roles of a user in the Keycloak integration.
 * @method GET
 * @route /cssapi/role/user/:username
 * @protected Requires "playground-admin"
 */
export const getKCUserRoles = errorWrapper(async (req: Request, res: Response) => {
  const { username } = getParams(req, usernamePathParamsSchema);

  res.json(await getUserRoles(username));
});

/**
 * Get users with a role in the Keycloak integration.
 * @method GET
 * @route /cssapi/role/users/:role
 * @protected Requires "playground-admin"
 */
export const getKCUsersWithRole = errorWrapper(async (req: Request, res: Response) => {
  const { role } = getParams(req, rolePathParamsSchema);
  const { page, maxCount } = getQuery(req, getUsersWithRoleQuerySchema);

  res.json(await getUsersWithRole(role, Number(page), Number(maxCount)));
});

/**
 * Assign a role to a user in the Keycloak integration.
 * @method POST
 * @route /cssapi/role/assign/:username
 * @protected Requires "playground-admin"
 */
export const assignKCUserRole = errorWrapper(async (req: Request, res: Response) => {
  const { username } = getParams(req, usernamePathParamsSchema);
  const { role } = getQuery(req, roleQuerySchema);

  const roleNames = [role];

  res.json(await assignUserRoles(username, roleNames));
});

/**
 * Unassign a role from a user in the Keycloak integration.
 * @method DELETE
 * @route /cssapi/role/assign/:username
 * @protected Requires "playground-admin"
 */
export const unassignKCUserRole = errorWrapper(async (req: Request, res: Response) => {
  const { username } = getParams(req, usernamePathParamsSchema);
  const { role } = getQuery(req, roleQuerySchema);

  res.json(await unassignUserRole(username, role));
});
