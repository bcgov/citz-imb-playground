import config from '../config';
const { DEBUG } = config;

export const debugController = (controllerName: string, moduleName: string) => {
  if (DEBUG) console.info(`DEBUG: ${controllerName} controller in modules/${moduleName} called.`);
};
