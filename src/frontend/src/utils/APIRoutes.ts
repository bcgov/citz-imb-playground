/* eslint-disable @typescript-eslint/no-explicit-any */
export const APIRoutes = {
  getRoles: '/cssapi/role/roles',
  getRole: (roleName: string) => `/cssapi/role/${roleName}`,
  createRole: (roleName: string) => `/cssapi/role/${roleName}`,
  deleteRole: (roleName: string) => `/cssapi/role/${roleName}`,
  getIntegration: '/api/cssapi/integration',
  getIDIRUsers: (query: any) =>
    `/cssapi/user/idir-user?firstName=${query.firstName}&lastName=${query.lastName}&email=${query.email}&guid=${query.guid}`,
  getAzureIDIRUsers: (query: any) =>
    `/cssapi/user/azure-user?firstName=${query.firstName}&lastName=${query.lastName}&email=${query.email}&guid=${query.guid}`,
  getGitHubBCGovUsers: (query: any) =>
    `/cssapi/user/github/bcgov?name=${query.name}&login=${query.login}&email=${query.email}&guid=${query.guid}`,
  getGitHubPublicUsers: (query: any) =>
    `/cssapi/user/github/bcgov?name=${query.name}&login=${query.login}&email=${query.email}&guid=${query.guid}`,
  getBasicBCeIDUsers: (guid: string) => `/cssapi/user/bceid/basic/${guid}`,
  getBusinessBCeIDUsers: (guid: string) => `/cssapi/user/bceid/business/${guid}`,
  getBothBCeIDUsers: (guid: string) => `/cssapi/user/bceid/both/${guid}`,
  assignUserRole: (username: string, query: any) =>
    `/cssapi/role/assign/${username}?role=${query.role}`,
  unassignUserRole: (username: string, query: any) =>
    `/cssapi/role/assign/${username}?role=${query.role}`,
  updateRole: (roleName: string, query: any) =>
    `/cssapi/role/${roleName}?newRoleName=${query.newRoleName}`,
  getRoleComposites: (roleName: string) => `/cssapi/role/composite/${roleName}`,
  addRoleComposite: (roleName: string, query: any) =>
    `/cssapi/role/composite/${roleName}?newCompositeRoleName=${query.newCompositeRoleName}`,
  deleteRoleComposite: (roleName: string, query: any) =>
    `/cssapi/role/composite/${roleName}?compositeRoleName=${query.compositeRoleName}`,
  getUserRoles: (username: string) => `/cssapi/role/user/${username}`,
  getUsersWithRole: (roleName: string, query?: any) =>
    `/cssapi/role/users/${roleName}${query ? `?page=${query.page}&count=${query.maxCount}` : ''}`,
};
