import express from "express";
const router = express.Router();

import { getKCRole } from "./controller";

/**
 * @method GET
 * @param role - The role name to search.
 * @route /cssAPI/getRole
 * @protected Requires "admin"
 */
router.get("/getRole", getKCRole);

export default router;
