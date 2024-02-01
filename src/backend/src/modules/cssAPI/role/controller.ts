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
  const pathParamsSchema = rolePathParamsSchema;
  const { role } = getParams(req, pathParamsSchema);

  res.json(await getRole(role));
});

/**
 * @method POST
 * @route /cssapi/role/:role
 * @protected Requires "playground-admin"
 */
export const createKCRole = errorWrapper(async (req: Request, res: Response) => {
  const pathParamsSchema = rolePathParamsSchema;
  const { role } = getParams(req, pathParamsSchema);

  res.json(await createRole(role));
});

/**
 * @method DELETE
 * @route /cssapi/role/:role
 * @protected Requires "playground-admin"
 */
export const deleteKCRole = errorWrapper(async (req: Request, res: Response) => {
  const pathParamsSchema = rolePathParamsSchema;
  const { role } = getParams(req, pathParamsSchema);

  res.json(await deleteRole(role));
});

/**
 * @method PATCH
 * @route /cssapi/role/:role
 * @protected Requires "playground-admin"
 */
export const updateKCRole = errorWrapper(async (req: Request, res: Response) => {
  const querySchema = updateRoleQuerySchema;
  const pathParamsSchema = rolePathParamsSchema;

  const { role } = getParams(req, pathParamsSchema);
  const { newRoleName } = getQuery(req, querySchema);

  res.json(await updateRole(role, newRoleName));
});

/**
 * @method GET
 * @route /cssapi/role/composite/:role
 * @protected Requires "playground-admin"
 */
export const getKCRoleComposites = errorWrapper(async (req: Request, res: Response) => {
  const pathParamsSchema = rolePathParamsSchema;
  const { role } = getParams(req, pathParamsSchema);

  res.json(await getRoleComposites(role));
});

/**
 * @method POST
 * @route /cssapi/role/composite/:role
 * @protected Requires "playground-admin"
 */
export const addKCRoleComposite = errorWrapper(async (req: Request, res: Response) => {
  const querySchema = addRoleCompositeQuerySchema;
  const pathParamsSchema = rolePathParamsSchema;

  const { role } = getParams(req, pathParamsSchema);
  const { newCompositeRoleName } = getQuery(req, querySchema);

  res.json(await addRoleComposite(role, newCompositeRoleName));
});

/**
 * @method DELETE
 * @route /cssapi/role/composite/:role
 * @protected Requires "playground-admin"
 */
export const deleteKCRoleComposite = errorWrapper(async (req: Request, res: Response) => {
  const querySchema = deleteRoleCompositeQuerySchema;
  const pathParamsSchema = rolePathParamsSchema;

  const { role } = getParams(req, pathParamsSchema);
  const { compositeRoleName } = getQuery(req, querySchema);

  res.json(await deleteRoleComposite(role, compositeRoleName));
});
