import { Request, Response } from "express";
import { errorWrapper } from "../../../utils";
import { getIntegration } from "@bcgov/citz-imb-kc-css-api";

import config from "../../../../config";
const { DEBUG } = config;

/**
 * @method GET
 * @route /cssAPI/integration
 * @protected Requires "playground-admin"
 */
export const getKCIntegration = errorWrapper(
  async (req: Request, res: Response) => {
    if (DEBUG)
      console.info(
        "DEBUG: getKCIntegration controller in modules/cssAPI called."
      );

    res.json(await getIntegration());
  }
);
