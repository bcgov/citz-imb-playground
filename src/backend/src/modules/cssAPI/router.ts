import express from 'express';
const router = express.Router();

import { getKCIntegration } from './integration/controller';
import {
  getKCRole,
  getKCRoles,
  createKCRole,
  deleteKCRole,
  updateKCRole,
  getKCRoleComposites,
  addKCRoleComposite,
  deleteKCRoleComposite,
} from './role/controller';
import {
  getKCUserRoles,
  getKCUsersWithRole,
  assignKCUserRole,
  unassignKCUserRole,
} from './role-mapping/controller';
import {
  getKCAzureIDIRUser,
  getKCIDIRUser,
  getKCGitHubBCGovUsers,
  getKCGitHubPublicUsers,
  getKCBasicBCeIDUser,
  getKCBusinessBCeIDUser,
  getKCBothBCeIDUser,
} from './user/controller';

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
 * @route /cssapi/user/idir-user
 * @protected Requires "playground-admin"
 */
router.route('/user/idir-user').get(getKCIDIRUser);

/**
 * @method GET
 * @route /cssapi/user/azure-user
 * @protected Requires "playground-admin"
 */
router.route('/user/azure-user').get(getKCAzureIDIRUser);

/**
 * @method GET
 * @route /cssapi/user/github/bcgov
 * @protected Requires "playground-admin"
 */
router.route('/user/github/bcgov').get(getKCGitHubBCGovUsers);

/**
 * @method GET
 * @route /cssapi/user/github/public
 * @protected Requires "playground-admin"
 */
router.route('/user/github/public').get(getKCGitHubPublicUsers);

/**
 * @method GET
 * @param guid - The user guid to search for.
 * @route /cssapi/user/bceid/basic/:guid
 * @protected Requires "playground-admin"
 */
router.route('/user/github/bceid/basic/:guid').get(getKCBasicBCeIDUser);

/**
 * @method GET
 * @param guid - The user guid to search for.
 * @route /cssapi/user/bceid/business/:guid
 * @protected Requires "playground-admin"
 */
router.route('/user/github/bceid/business/:guid').get(getKCBusinessBCeIDUser);

/**
 * @method GET
 * @param guid - The user guid to search for.
 * @route /cssapi/user/bceid/both/:guid
 * @protected Requires "playground-admin"
 */
router.route('/user/github/bceid/both/:guid').get(getKCBothBCeIDUser);

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
 * @param role - The role name to search.
 * @route /cssapi/role/composite/:role
 * @protected Requires "playground-admin"
 */
router
  .route('/role/composite/:role')
  .get(getKCRoleComposites)
  .post(addKCRoleComposite)
  .delete(deleteKCRoleComposite);

/**
 * @method GET
 * @param username - The username to search.
 * @route /cssapi/role/user/:username
 * @protected Requires "playground-admin"
 */
router.route('/role/user/:username').get(getKCUserRoles);

/**
 * @method GET
 * @param role - The role name to search.
 * @route /cssapi/role/users/:role
 * @protected Requires "playground-admin"
 */
router.route('/role/users/:role').get(getKCUsersWithRole);

/**
 * @method GET
 * @method POST
 * @method PATCH
 * @method DELETE
 * @param role - The role name to search, create, or delete.
 * @route /cssapi/role/:role
 * @protected Requires "playground-admin"
 */
router
  .route('/role/:role')
  .get(getKCRole)
  .post(createKCRole)
  .patch(updateKCRole)
  .delete(deleteKCRole);

export default router;
