import { Request, Response } from 'express';
import { errorWrapper } from '../../../utils';
import { getIntegration } from '@bcgov/citz-imb-kc-css-api';

/**
 * Get details from the Keycloak integration.
 * @method GET
 * @route /cssAPI/integration
 * @protected Requires "playground-admin"
 */
export const getKCIntegration = errorWrapper(async (req: Request, res: Response) => {
  res.json(await getIntegration());
});
