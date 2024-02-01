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
  guidPathParamsSchema,
  rolePathParamsSchema,
  roleQuerySchema,
  usernamePathParamsSchema,
} from './schemas';

/**
 * @method GET
 * @route /cssapi/role/user/:username
 * @protected Requires "playground-admin"
 */
export const getKCUserRoles = errorWrapper(async (req: Request, res: Response) => {
  const pathParamsSchema = usernamePathParamsSchema;
  const { username } = getParams(req, pathParamsSchema);

  res.json(await getUserRoles(username));
});

/**
 * @method GET
 * @route /cssapi/role/users/:role
 * @protected Requires "playground-admin"
 */
export const getKCUsersWithRole = errorWrapper(async (req: Request, res: Response) => {
  const querySchema = getUsersWithRoleQuerySchema;
  const pathParamsSchema = rolePathParamsSchema;

  const { role } = getParams(req, pathParamsSchema);
  const { page, maxCount } = getQuery(req, querySchema);

  res.json(await getUsersWithRole(role, Number(page), Number(maxCount)));
});

/**
 * @method POST
 * @route /cssapi/role/assign/:guid
 * @protected Requires "playground-admin"
 */
export const assignKCUserRole = errorWrapper(async (req: Request, res: Response) => {
  const querySchema = roleQuerySchema;
  const pathParamsSchema = guidPathParamsSchema;

  const { guid } = getParams(req, pathParamsSchema);
  const { role } = getQuery(req, querySchema);

  const roleNames = [role];

  res.json(await assignUserRoles(guid, roleNames));
});

/**
 * @method DELETE
 * @route /cssapi/role/assign/:guid
 * @protected Requires "playground-admin"
 */
export const unassignKCUserRole = errorWrapper(async (req: Request, res: Response) => {
  const querySchema = roleQuerySchema;
  const pathParamsSchema = guidPathParamsSchema;

  const { guid } = getParams(req, pathParamsSchema);
  const { role } = getQuery(req, querySchema);

  res.json(await unassignUserRole(guid, role));
});
