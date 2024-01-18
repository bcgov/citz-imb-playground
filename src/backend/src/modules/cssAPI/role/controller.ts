import { Request, Response } from 'express';
import { errorWrapper, httpStatusCode } from '../../../utils';
import {
  getRole,
  getRoles,
  createRole,
  deleteRole,
  assignUserRoles,
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
 * @route /cssAPI/role/assign/:guid
 * @protected Requires "playground-admin"
 */
export const assignUserRole = errorWrapper(async (req: Request, res: Response) => {
  const { guid } = req.params;
  const { role } = req.query;

  if (!role || role === '' || typeof role !== 'string') {
    res.status(404).send("Missing 'role' in request param.");
    return;
  }

  const roleNames = [role];

  res.json(await assignUserRoles(guid, roleNames));
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
