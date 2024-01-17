import { Request, Response } from "express";
import { errorWrapper } from "../../../utils";
import {
  getRole,
  getRoles,
  createRole,
  deleteRole,
  assignUserRoles,
} from "@bcgov/citz-imb-kc-css-api";

import config from "../../../../config";
const { DEBUG } = config;

/**
 * @method GET
 * @route /cssAPI/role/roles
 * @protected Requires "playground-admin"
 */
export const getKCRoles = errorWrapper(async (req: Request, res: Response) => {
  if (DEBUG)
    console.info("DEBUG: getKCRoles controller in modules/cssAPI called.");

  res.json(await getRoles());
});

/**
 * @method GET
 * @param role - The role name to search.
 * @route /cssAPI/role/:role
 * @protected Requires "playground-admin"
 */
export const getKCRole = errorWrapper(async (req: Request, res: Response) => {
  if (DEBUG)
    console.info("DEBUG: getKCRole controller in modules/cssAPI called.");

  const role = req.params.role;
  if (!role || role === "" || typeof role !== "string") {
    res.status(404).send("Missing 'role' in request query.");
    return;
  }

  res.json(await getRole(role));
});



/**
 * @method POST
 * @param role - The role name to create.
 * @route /cssAPI/role/:role
 * @protected Requires "playground-admin"
 */
export const createKCRole = errorWrapper(
  async (req: Request, res: Response) => {
    if (DEBUG)
      console.info("DEBUG: createKCRole controller in modules/cssAPI called.");

    const role = req.params.role;
    if (!role || role === "" || typeof role !== "string") {
      res.status(404).send("Missing 'role' in request param.");
      return;
    }

    res.json(await createRole(role));
  }
);

/**
 * @method POST
 * @param role - The role name to assign.
 * @param user - The user's GUID
 * @route /cssAPI/role/assign/:guid
 * @protected Requires "playground-admin"
 */
export const assignUserRole = errorWrapper(
  async (req: Request, res: Response) => {
    const { guid } = req.params;
    const { role } = req.query;

    if (DEBUG)
      console.info("DEBUG: assignKCUserRole controller in modules/cssAPI called.");

    if (!role || role === "" || typeof role !== "string") {
      res.status(404).send("Missing 'role' in request param.");
      return;
    }
    const roleNames = [role];

    res.json(await assignUserRoles(guid, roleNames));
  }
);

/**
 * @method DELETE
 * @param role - The role name to delete.
 * @route /cssAPI/role/:role
 * @protected Requires "playground-admin"
 */
export const deleteKCRole = errorWrapper(
  async (req: Request, res: Response) => {
    if (DEBUG)
      console.info("DEBUG: deleteKCRole controller in modules/cssAPI called.");

    const role = req.params.role;
    if (!role || role === "" || typeof role !== "string") {
      res.status(404).send("Missing 'role' in request param.");
      return;
    }

    res.json(await deleteRole(role));
  }
);
