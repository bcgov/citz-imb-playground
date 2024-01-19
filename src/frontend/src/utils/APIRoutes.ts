export const APIRoutes = {
  getRoles: '/cssapi/role/roles',
  getRole: (roleName: string) => `/cssapi/role/${roleName}`,
  createRole: (roleName: string) => `/cssapi/role/${roleName}`,
  deleteRole: (roleName: string) => `/cssapi/role/${roleName}`,
  getIntegration: '/api/cssapi/integration',
  getIDIRUser: (firstName: string, lastName: string, email: string) => `/cssapi/user/idir-user?firstName=${firstName}&lastName=${lastName}&email=${email}`,
  getAzureIDIRUser: (firstName: string, lastName: string, email: string) => `/cssapi/user/azure-user?firstName=${firstName}&lastName=${lastName}&email=${email}`, 
};
