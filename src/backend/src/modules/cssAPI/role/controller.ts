import { Request, Response } from 'express';
import { errorWrapper, getParams, getQuery } from '../../../utils';
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
 * @method GET
 * @route /cssapi/role/roles
 * @protected Requires "playground-admin"
 */
export const getKCRoles = errorWrapper(async (req: Request, res: Response) => {
  res.json(await getRoles());
});

/**
 * @method GET
 * @route /cssapi/role/:role
 * @protected Requires "playground-admin"
 */
export const getKCRole = errorWrapper(async (req: Request, res: Response) => {
  const { role } = getParams(req, rolePathParamsSchema);

  res.json(await getRole(role));
});

/**
 * @method POST
 * @route /cssapi/role/:role
 * @protected Requires "playground-admin"
 */
export const createKCRole = errorWrapper(async (req: Request, res: Response) => {
  const { role } = getParams(req, rolePathParamsSchema);

  res.json(await createRole(role));
});

/**
 * @method DELETE
 * @route /cssapi/role/:role
 * @protected Requires "playground-admin"
 */
export const deleteKCRole = errorWrapper(async (req: Request, res: Response) => {
  const { role } = getParams(req, rolePathParamsSchema);

  res.json(await deleteRole(role));
});

/**
 * @method PATCH
 * @route /cssapi/role/:role
 * @protected Requires "playground-admin"
 */
export const updateKCRole = errorWrapper(async (req: Request, res: Response) => {
  const { role } = getParams(req, rolePathParamsSchema);
  const { newRoleName } = getQuery(req, updateRoleQuerySchema);

  res.json(await updateRole(role, newRoleName));
});

/**
 * @method GET
 * @route /cssapi/role/composite/:role
 * @protected Requires "playground-admin"
 */
export const getKCRoleComposites = errorWrapper(async (req: Request, res: Response) => {
  const { role } = getParams(req, rolePathParamsSchema);

  res.json(await getRoleComposites(role));
});

/**
 * @method POST
 * @route /cssapi/role/composite/:role
 * @protected Requires "playground-admin"
 */
export const addKCRoleComposite = errorWrapper(async (req: Request, res: Response) => {
  const { role } = getParams(req, rolePathParamsSchema);
  const { newCompositeRoleName } = getQuery(req, addRoleCompositeQuerySchema);

  res.json(await addRoleComposite(role, newCompositeRoleName));
});

/**
 * @method DELETE
 * @route /cssapi/role/composite/:role
 * @protected Requires "playground-admin"
 */
export const deleteKCRoleComposite = errorWrapper(async (req: Request, res: Response) => {
  const { role } = getParams(req, rolePathParamsSchema);
  const { compositeRoleName } = getQuery(req, deleteRoleCompositeQuerySchema);

  res.json(await deleteRoleComposite(role, compositeRoleName));
});
