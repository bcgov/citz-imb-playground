import { Request, Response } from "express";
import { errorWrapper } from "../../../utils";
import {
    getAzureIDIRUsers,
    getIDIRUsers,
    IDIRUserQuery,
  } from "@bcgov/citz-imb-kc-css-api";

import config from "../../../../config";
const { DEBUG } = config;

/**
 * @method GET
 * @param user - The user info to query.
 * @route /cssAPI/idir-user
 * @protected Requires "playground-admin"
 */
export const getKCIDIRUser = errorWrapper(async (req: Request, res: Response) => {
    if (DEBUG)
      console.info("DEBUG: getKCUser controller in modules/cssAPI called.");
  
    const user: IDIRUserQuery = {
      firstName: req.query.firstName as string,
    };

    if (!user.firstName || user.firstName === "" || typeof user.firstName !== "string") {
      res.status(404).send("Missing 'role' in request query.");
      return;
    }
  
    res.json(await getIDIRUsers(user));
});

/**
 * @method GET
 * @param user - The user info to query.
 * @route /cssAPI/azure-user
 * @protected Requires "playground-admin"
 */
export const getKCAzureIDIRUser = errorWrapper(async (req: Request, res: Response) => {
  if (DEBUG)
    console.info("DEBUG: getKCUser controller in modules/cssAPI called.");

  const user: IDIRUserQuery = {
    firstName: req.query.firstName as string,
  };

  if (!user.firstName || user.firstName === "" || typeof user.firstName !== "string") {
    res.status(404).send("Missing 'role' in request query.");
    return;
  }

  res.json(await getAzureIDIRUsers(user));
});
