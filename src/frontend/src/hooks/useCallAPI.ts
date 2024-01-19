import { useKeycloak } from '@bcgov/citz-imb-kc-react';

export const useCallAPI = () => {
    const { getAuthorizationHeaderValue } = useKeycloak();
    const getMethod = async (endpoint: string) => {
      try {
        console.log('Calling API...');
        const response = await fetch(`/api${endpoint}`, {
          method: 'GET',
          headers: { Authorization: getAuthorizationHeaderValue() },
        });
  
        const data = await response.json();
        if (data) console.log(data);
        console.log(`Completed with status ${response.status}.`);
      } catch (error) {
        console.error(error);
      }
    };
    const postMethod = async (endpoint: string) => {
      try {
        console.log('Calling API...');
        const response = await fetch(`/api${endpoint}`, {
          method: 'POST',
          headers: { Authorization: getAuthorizationHeaderValue() },
        });
  
        const data = await response.json();
        if (data) console.log(data);
        console.log(`Completed with status ${response.status}.`);
      } catch (error) {
        console.error(error);
      }
    };
    const putMethod = async (endpoint: string) => {
      try {
        console.log('Calling API...');
        const response = await fetch(`/api${endpoint}`, {
          method: 'PUT',
          headers: { Authorization: getAuthorizationHeaderValue() },
        });
  
        const data = await response.json();
        if (data) console.log(data);
        console.log(`Completed with status ${response.status}.`);
      } catch (error) {
        console.error(error);
      }
    };
    const deleteMethod = async (endpoint: string) => {
      try {
        console.log('Calling API...');
        const response = await fetch(`/api${endpoint}`, {
          method: 'DELETE',
          headers: { Authorization: getAuthorizationHeaderValue() },
        });
  
        const data = await response.json();
        if (data) console.log(data);
        console.log(`Completed with status ${response.status}.`);
      } catch (error) {
        console.error(error);
      }
    };
    return {
      getMethod,
      postMethod,
      putMethod,
      deleteMethod,
    }
};
