import { useKeycloak } from '@bcgov/citz-imb-kc-react';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export const useCallAPI = () => {
  const { getAuthorizationHeaderValue } = useKeycloak();

  const callAPI = async (endpoint: string, method: Method) => {
    try {
      console.log('Calling API...');
      const response = await fetch(`/api${endpoint}`, {
        method: method,
        headers: { Authorization: getAuthorizationHeaderValue() },
      });

      const data = await response.json();
      if (data) return data;
      else {
        console.log(`Completed with status ${response.status}.`);
        return `Completed with status ${response.status}.`;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    getMethod: (endpoint: string) => callAPI(endpoint, 'GET'),
    postMethod: (endpoint: string) => callAPI(endpoint, 'POST'),
    putMethod: (endpoint: string) => callAPI(endpoint, 'PUT'),
    patchMethod: (endpoint: string) => callAPI(endpoint, 'PATCH'),
    deleteMethod: (endpoint: string) => callAPI(endpoint, 'DELETE'),
  };
};
