import express from "express";
const router = express.Router();

import { getKCIntegration } from "./integration/controller";
import {
  getKCRole,
  getKCRoles,
  createKCRole,
  deleteKCRole,
} from "./role/controller";

/**
 * @method GET
 * @route /cssAPI/integration
 * @protected Requires "playground-admin"
 */
router.get("/integration", getKCIntegration);

/**
 * @method GET
 * @route /cssAPI/role/roles
 * @protected Requires "playground-admin"
 */
router.get("/role/roles", getKCRoles);

/**
 * @method GET
 * @param role - The role name to search.
 * @route /cssAPI/role
 * @protected Requires "playground-admin"
 */
router.get("/role", getKCRole);

/**
 * @method POST
 * @param role - The role name to create.
 * @route /cssAPI/role/:role
 * @protected Requires "playground-admin"
 */
router.post("/role/:role", createKCRole);

/**
 * @method DELETE
 * @param role - The role name to delete.
 * @route /cssAPI/role/:role
 * @protected Requires "playground-admin"
 */
router.delete("/role/:role", deleteKCRole);

export default router;
