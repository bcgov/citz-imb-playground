import express from "express";
const router = express.Router();

import { getKCIntegration } from "./integration/controller";
import {
  getKCRole,
  getKCRoles,
  createKCRole,
  deleteKCRole,
  assignUserRole,
} from "./role/controller";
import { getKCIDIRUser } from "./user/controller";

/**
 * @method GET
 * @route /cssAPI/integration
 * @protected Requires "playground-admin"
 */
router.route("/integration").get(getKCIntegration);

/**
 * @method GET
 * @route /cssAPI/role/roles
 * @protected Requires "playground-admin"
 */
router.route("/role/roles").get(getKCRoles);

/**
 * @method GET
 * @param role - The role name to search.
 * @route /cssAPI/role
 * @protected Requires "playground-admin"
 */
router.get("/role", getKCRole);

/**
 * @method GET
 * @param user - The user's first name to search.
 * @route /cssAPI/user
 * @protected Requires "playground-admin"
 */
router.get("/user", getKCIDIRUser);

/**
 * @method POST
 * @param role - The role name to create.
 * @route /cssAPI/role/:role
 * @protected Requires "playground-admin"
 */
router.post("/role/:role", createKCRole);

/**
 * @method POST
 * @param role - The role name to create.
 * @param user - The user's GUID
 * @route /cssAPI/role/assign/:guid
 * @protected Requires "playground-admin"
 */
router.post("/role/assign/:guid", assignUserRole);

/**
 * @method POST
 * @method DELETE
 * @param role - The role name to search, create, or delete.
 * @route /cssAPI/role/:role
 * @protected Requires "playground-admin"
 */
router
  .route("/role/:role")
  .get(getKCRole)
  .post(createKCRole)
  .delete(deleteKCRole);

export default router;
