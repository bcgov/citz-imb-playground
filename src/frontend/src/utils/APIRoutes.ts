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
  assignUserRole: (username: string, query: any) =>
    `/cssapi/role/assign/${username}?role=${query.role}`,
  unassignUserRole: (username: string, query: any) =>
    `/cssapi/role/assign/${username}?role=${query.role}`,
};
