import { Request, Response } from 'express';
import { errorWrapper, httpStatusCode } from '../../../utils';
import {
  getRole,
  getRoles,
  createRole,
  deleteRole,
  assignUserRoles,
  unassignUserRole,
} from '@bcgov/citz-imb-kc-css-api';

/**
 * @method GET
 * @route /cssapi/role/roles
 * @protected Requires "playground-admin"
 */
export const getKCRoles = errorWrapper(async (req: Request, res: Response) => {
  res.json(await getRoles());
});

/**
 * @method GET
 * @param role - The role name to search.
 * @route /cssapi/role/:role
 * @protected Requires "playground-admin"
 */
export const getKCRole = errorWrapper(async (req: Request, res: Response) => {
  const role = req.params.role;
  if (!role) return res.status(httpStatusCode.NOT_FOUND).send("Missing 'role' in request query.");

  res.json(await getRole(role));
});

/**
 * @method POST
 * @param role - The role name to create.
 * @route /cssapi/role/:role
 * @protected Requires "playground-admin"
 */
export const createKCRole = errorWrapper(async (req: Request, res: Response) => {
  const role = req.params.role;
  if (!role) return res.status(httpStatusCode.NOT_FOUND).send("Missing 'role' in request param.");

  res.json(await createRole(role));
});

/**
 * @method POST
 * @param guid - The user's GUID
 * @query role - The role to assign
 * @route /cssapi/role/assign/:guid
 * @protected Requires "playground-admin"
 */
export const assignKCUserRole = errorWrapper(async (req: Request, res: Response) => {
  const { guid } = req.params;
  const { role } = req.query;

  if (!role || role === '' || typeof role !== 'string')
    return res.status(404).send("Missing 'role' in request query.");

  if (!guid || guid === '' || typeof role !== 'string')
    return res.status(404).send("Missing 'guid' in request param.");

  const roleNames = [role];

  res.json(await assignUserRoles(guid, roleNames));
});

/**
 * @method DELETE
 * @param guid - The user's GUID
 * @query role - The role to unassign
 * @route /cssapi/role/assign/:guid
 * @protected Requires "playground-admin"
 */
export const unassignKCUserRole = errorWrapper(async (req: Request, res: Response) => {
  const { guid } = req.params;
  const { role } = req.query;

  if (!role || role === '' || typeof role !== 'string')
    return res.status(404).send("Missing 'role' in request query.");

  if (!guid || guid === '' || typeof role !== 'string')
    return res.status(404).send("Missing 'guid' in request param.");

  res.json(await unassignUserRole(guid, role));
});

/**
 * @method DELETE
 * @param role - The role name to delete.
 * @route /cssapi/role/:role
 * @protected Requires "playground-admin"
 */
export const deleteKCRole = errorWrapper(async (req: Request, res: Response) => {
  const role = req.params.role;
  if (!role) return res.status(httpStatusCode.NOT_FOUND).send("Missing 'role' in request param.");

  res.json(await deleteRole(role));
});
