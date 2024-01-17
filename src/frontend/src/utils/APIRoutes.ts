export const APIRoutes = {
  getRoles: '/cssapi/role/roles',
  getRole: (roleName: string) => `/cssapi/role/${roleName}`,
  createRole: (roleName: string) => `/cssapi/role/${roleName}`,
  deleteRole: (roleName: string) => `/cssapi/role/${roleName}`,
  getIntegration: '/api/cssapi/integration',
};
