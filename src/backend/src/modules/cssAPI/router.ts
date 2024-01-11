import express from "express";
const router = express.Router();

import {
  getKCRole,
  getKCRoles,
  createKCRole,
  deleteKCRole,
} from "./controller";

/**
 * @method GET
 * @route /cssAPI/getRoles
 * @protected Requires "playground-admin"
 */
router.get("/getRoles", getKCRoles);

/**
 * @method GET
 * @param role - The role name to search.
 * @route /cssAPI/getRole
 * @protected Requires "playground-admin"
 */
router.get("/getRole", getKCRole);

/**
 * @method POST
 * @param role - The role name to create.
 * @route /cssAPI/createRole/:role
 * @protected Requires "playground-admin"
 */
router.post("/createRole/:role", createKCRole);

/**
 * @method DELETE
 * @param role - The role name to delete.
 * @route /cssAPI/deleteRole/:role
 * @protected Requires "playground-admin"
 */
router.delete("/deleteRole/:role", deleteKCRole);

export default router;
