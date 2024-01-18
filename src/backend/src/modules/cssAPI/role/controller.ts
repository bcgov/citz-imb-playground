import { Request, Response } from 'express';
import { errorWrapper, httpStatusCode } from '../../../utils';
import { getRole, getRoles, createRole, deleteRole } from '@bcgov/citz-imb-kc-css-api';

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
  if (!role) {
    res.status(httpStatusCode.NOT_FOUND).send("Missing 'role' in request query.");
    return;
  }

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
  if (!role) {
    res.status(httpStatusCode.NOT_FOUND).send("Missing 'role' in request param.");
    return;
  }

  res.json(await createRole(role));
});

/**
 * @method DELETE
 * @param role - The role name to delete.
 * @route /cssapi/role/:role
 * @protected Requires "playground-admin"
 */
export const deleteKCRole = errorWrapper(async (req: Request, res: Response) => {
  const role = req.params.role;
  if (!role) {
    res.status(httpStatusCode.NOT_FOUND).send("Missing 'role' in request param.");
    return;
  }

  res.json(await deleteRole(role));
});
