export const APIRoutes = {
  getRoles: "/cssAPI/role/roles",
  getRole: (roleName: string) => `/cssAPI/role/${roleName}`,
  createRole: (roleName: string) => `/cssAPI/role/${roleName}`,
  deleteRole: (roleName: string) => `/cssAPI/role/${roleName}`,
  getIntegration: "/api/cssAPI/integration",
};
