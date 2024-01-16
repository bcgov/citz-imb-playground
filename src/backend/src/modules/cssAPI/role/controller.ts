import { Request, Response } from "express";
import { errorWrapper } from "../../../utils";
import {
  getRole,
  getRoles,
  createRole,
  deleteRole,
  assignUserRoles,
  getAzureIDIRUsers,
  IDIRUserQuery,
} from "@bcgov/citz-imb-kc-css-api";

import { KeycloakIdirUser } from "@bcgov/citz-imb-kc-express";

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
 * @route /cssAPI/role
 * @protected Requires "playground-admin"
 */
export const getKCRole = errorWrapper(async (req: Request, res: Response) => {
  if (DEBUG)
    console.info("DEBUG: getKCRole controller in modules/cssAPI called.");

  const role = req.query.role;
  if (!role || role === "" || typeof role !== "string") {
    res.status(404).send("Missing 'role' in request query.");
    return;
  }

  res.json(await getRole(role));
});

/**
 * @method GET
 * @param user - The user name to search.
 * @route /cssAPI/getUser
 * @protected Requires "playground-admin"
 */
export const getKCUser = errorWrapper(async (req: Request, res: Response) => {
  if (DEBUG)
    console.info("DEBUG: getKCUser controller in modules/cssAPI called.");

  const user: IDIRUserQuery = {
    firstName: req.query.user as string,
  };

  if (!user.firstName || user.firstName === "" || typeof user.firstName !== "string") {
    res.status(404).send("Missing 'role' in request query.");
    return;
  }

  res.json(await getAzureIDIRUsers(user));
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
 * @route /cssAPI/assignUserRoles/:role
 * @protected Requires "playground-admin"
 */
export const assignUserRole = errorWrapper(
  async (req: Request, res: Response) => {
    const user = req.user;
    const userName = `${(user as KeycloakIdirUser)?.idir_user_guid}@idir`
    if (DEBUG)
      console.info("DEBUG: assignKCUserRole controller in modules/cssAPI called.");

    const role = req.params.role;
    if (!role || role === "" || typeof role !== "string") {
      res.status(404).send("Missing 'role' in request param.");
      return;
    }
    const roleNames = [role];

    res.json(await assignUserRoles(userName, roleNames));
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
