import express from 'express';
const router = express.Router();

import { getKCIntegration } from './integration/controller';
import { getKCRole, getKCRoles, createKCRole, deleteKCRole } from './role/controller';

/**
 * @method GET
 * @route /cssapi/integration
 * @protected Requires "playground-admin"
 */
router.route('/integration').get(getKCIntegration);

/**
 * @method GET
 * @route /cssapi/role/roles
 * @protected Requires "playground-admin"
 */
router.route('/role/roles').get(getKCRoles);

/**
 * @method GET
 * @method POST
 * @method DELETE
 * @param role - The role name to search, create, or delete.
 * @route /cssapi/role/:role
 * @protected Requires "playground-admin"
 */
router.route('/role/:role').get(getKCRole).post(createKCRole).delete(deleteKCRole);

export default router;
