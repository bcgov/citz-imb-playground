import { Request, Response } from 'express';
import { errorWrapper, getParams, getQuery, httpStatusCode } from '../../../utils';
import {
  getRole,
  getRoles,
  createRole,
  deleteRole,
  updateRole,
  getRoleComposites,
  addRoleComposite,
  deleteRoleComposite,
} from '@bcgov/citz-imb-kc-css-api';
import {
  addRoleCompositeQuerySchema,
  deleteRoleCompositeQuerySchema,
  rolePathParamsSchema,
  updateRoleQuerySchema,
} from './schemas';

/**
 * Get all roles in Keycloak integration.
 * @method GET
 * @route /cssapi/role/roles
 * @protected Requires "playground-admin"
 */
export const getKCRoles = errorWrapper(async (req: Request, res: Response) => {
  res.json(await getRoles());
});

/**
 * Get details on a Keycloak role.
 * @method GET
 * @route /cssapi/role/:role
 * @protected Requires "playground-admin"
 */
export const getKCRole = errorWrapper(async (req: Request, res: Response) => {
  const { role } = getParams(req, rolePathParamsSchema);

  res.json(await getRole(role));
});

/**
 * Create a new role in the Keycloak integration.
 * @method POST
 * @route /cssapi/role/:role
 * @protected Requires "playground-admin"
 */
export const createKCRole = errorWrapper(async (req: Request, res: Response) => {
  const { role } = getParams(req, rolePathParamsSchema);

  res.send(httpStatusCode.CREATED).json(await createRole(role));
});

/**
 * Delete a role in the Keycloak integration.
 * @method DELETE
 * @route /cssapi/role/:role
 * @protected Requires "playground-admin"
 */
export const deleteKCRole = errorWrapper(async (req: Request, res: Response) => {
  const { role } = getParams(req, rolePathParamsSchema);

  res.json(await deleteRole(role));
});

/**
 * Update a role in the Keycloak integration.
 * @method PATCH
 * @route /cssapi/role/:role
 * @protected Requires "playground-admin"
 */
export const updateKCRole = errorWrapper(async (req: Request, res: Response) => {
  const { role } = getParams(req, rolePathParamsSchema);
  const { newRoleName } = getQuery(req, updateRoleQuerySchema);

  res.send(httpStatusCode.ACCEPTED).json(await updateRole(role, newRoleName));
});

/**
 * Get composites of a role in the Keycloak integration.
 * @method GET
 * @route /cssapi/role/composite/:role
 * @protected Requires "playground-admin"
 */
export const getKCRoleComposites = errorWrapper(async (req: Request, res: Response) => {
  const { role } = getParams(req, rolePathParamsSchema);

  res.json(await getRoleComposites(role));
});

/**
 * Add a composite role to another role in the Keycloak integration.
 * @method POST
 * @route /cssapi/role/composite/:role
 * @protected Requires "playground-admin"
 */
export const addKCRoleComposite = errorWrapper(async (req: Request, res: Response) => {
  const { role } = getParams(req, rolePathParamsSchema);
  const { newCompositeRoleName } = getQuery(req, addRoleCompositeQuerySchema);

  res.send(httpStatusCode.CREATED).json(await addRoleComposite(role, newCompositeRoleName));
});

/**
 * Remove a composite role from another role in the Keycloak integration.
 * @method DELETE
 * @route /cssapi/role/composite/:role
 * @protected Requires "playground-admin"
 */
export const deleteKCRoleComposite = errorWrapper(async (req: Request, res: Response) => {
  const { role } = getParams(req, rolePathParamsSchema);
  const { compositeRoleName } = getQuery(req, deleteRoleCompositeQuerySchema);

  res.json(await deleteRoleComposite(role, compositeRoleName));
});
