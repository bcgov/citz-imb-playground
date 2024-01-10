import express from "express";
const router = express.Router();

import { getKCRole, getKCRoles } from "./controller";

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

export default router;
