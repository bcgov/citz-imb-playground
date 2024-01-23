import express from 'express';
const router = express.Router();

import { getKCIntegration } from './integration/controller';
import {
  getKCRole,
  getKCRoles,
  createKCRole,
  deleteKCRole,
  assignKCUserRole,
  unassignKCUserRole,
} from './role/controller';
import { getKCAzureIDIRUser, getKCIDIRUser } from './user/controller';

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
 * @param user - The user's first name to search.
 * @route /cssapi/user/idir-user
 * @protected Requires "playground-admin"
 */
router.route('/user/idir-user').get(getKCIDIRUser);

/**
 * @method GET
 * @param user - The user's first name to search.
 * @route /cssapi/user/azure-user
 * @protected Requires "playground-admin"
 */
router.route('/user/azure-user').get(getKCAzureIDIRUser);

/**
 * @method POST
 * @param guid - The user's GUID
 * @query role - The role to assign
 * @route /cssapi/role/assign/:guid
 * @protected Requires "playground-admin"
 */
router.route('/role/assign/:guid').post(assignKCUserRole).delete(unassignKCUserRole);

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
