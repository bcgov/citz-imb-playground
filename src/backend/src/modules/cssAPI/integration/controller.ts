import { Request, Response } from 'express';
import { errorWrapper, debugController } from '../../../utils';
import { getIntegration } from '@bcgov/citz-imb-kc-css-api';

/**
 * @method GET
 * @route /cssAPI/integration
 * @protected Requires "playground-admin"
 */
export const getKCIntegration = errorWrapper(async (req: Request, res: Response) => {
  debugController('getKCIntegration', 'cssapi');

  res.json(await getIntegration());
});
