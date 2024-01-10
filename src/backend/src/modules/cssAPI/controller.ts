import { Request, Response } from "express";
import { errorWrapper } from "../../utils";
import { getRole } from "@bcgov/citz-imb-kc-css-api";

import config from "../../../config";
const { DEBUG } = config;

/**
 * @method GET
 * @param role - The role name to search.
 * @route /cssAPI/getRole
 * @protected Requires "admin"
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
