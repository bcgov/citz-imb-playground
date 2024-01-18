import './Pages.css';
import React, { useEffect, useState } from 'react';
import { Stack } from 'components/common/Stack';
import { Card } from 'components/common/Card';
import { Txt } from 'components/common/Txt';
import { useKeycloak } from '@bcgov/citz-imb-kc-react';
import { DeniedIcon } from 'components/icons';
import { Button } from 'components/common/Button';
import { PackagesCard } from 'components/pages/CSSAPI/PackagesCard';
import { IntegrationDetailsCard } from 'components/pages/CSSAPI/IntegrationDetailsCard';
import { APIRoutes } from '../utils';

const CSSAPIPage = () => {
  const { hasRole, getAuthorizationHeaderValue, isAuthenticated } = useKeycloak();

  const [getRoleInput, setGetRoleInput] = useState('');
  const [createRoleInput, setCreateRoleInput] = useState('');
  const [deleteRoleInput, setDeleteRoleInput] = useState('');
  const [assignUserRoleInput, setAssignUserRoleInput] = useState('');
  const [userIDIRInputs, setUserIDIRInputs] = useState({firstName: '', lastName: '', email: '', guid: ''});
  const [userAzureIDIRInputs, setUserAzureIDIRInputs] = useState({firstName: '', lastName: '', email: '', guid: ''});
  const [IDIRInput, setIDIRInput] = useState("");

  type RequestMethod = 'GET' | 'PUT' | 'POST' | 'DELETE';

  const callAPI = async (endpoint: string, method: RequestMethod, query?: string) => {
    try {
      console.log('Calling API...');
      const response = await fetch(`/api${endpoint}${query ?? ''}`, {
        method,
        headers: { Authorization: getAuthorizationHeaderValue() },
      });

      const data = await response.json();
      if (data) return data;
      console.log(`Completed with status ${response.status}.`);
    } catch (error) {
      console.error(error);
    }
  };

  // Redirect if not logged in.
  useEffect(() => {
    if (!isAuthenticated) setTimeout(() => (window.location.href = '/'), 1000);
  }, [isAuthenticated]);

  return (
    <>
      <PackagesCard />
      {hasRole(['playground-admin']) ? (
        <>
          <IntegrationDetailsCard />
          <Stack direction="row">
            {/* GET ROLES */}
            <Card paddingY="10px" color={`var(--bcgov_lighter-blue4)`}>
              <Stack>
                <Stack direction="row">
                  <Txt bold>getRoles</Txt>
                  <Txt>Get all roles from integration.</Txt>
                </Stack>
                <hr />
                <Stack direction="row" center>
                  <Button size="s" onClick={() => callAPI(APIRoutes.getRoles, 'GET')}>
                    Search
                  </Button>
                  <Txt size="s">Prints to console (async).</Txt>
                </Stack>
              </Stack>
            </Card>
            {/* GET ROLE */}
            <Card paddingY="10px" color={`var(--bcgov_lighter-blue4)`}>
              <Stack>
                <Stack direction="row">
                  <Txt bold>getRole</Txt>
                  <Txt>Get role details.</Txt>
                </Stack>
                <hr />
                <Stack direction="row" center>
                  <input
                    type="text"
                    placeholder="Type a role name"
                    onChange={(e) => setGetRoleInput(e.target.value)}
                  ></input>
                  <Button
                    size="s"
                    onClick={() => {
                      if (getRoleInput !== '') callAPI(APIRoutes.getRole(getRoleInput), 'GET');
                    }}
                  >
                    Search
                  </Button>
                  <Txt size="s">Prints to console (async).</Txt>
                </Stack>
              </Stack>
            </Card>
          </Stack>
          <Stack direction="row">
            {/* CREATE ROLE */}
            <Card paddingY="10px" color={`var(--bcgov_lighter-blue4)`}>
              <Stack>
                <Stack direction="row">
                  <Txt bold>createRole</Txt>
                  <Txt>Create a new role.</Txt>
                </Stack>
                <hr />
                <Stack direction="row" center>
                  <input
                    type="text"
                    placeholder="Type a role name"
                    onChange={(e) => setCreateRoleInput(e.target.value)}
                  ></input>
                  <Button
                    size="s"
                    onClick={() => {
                      if (createRoleInput !== '')
                        callAPI(APIRoutes.createRole(createRoleInput), 'POST');
                    }}
                  >
                    Create
                  </Button>
                  <Txt size="s">Prints to console (async).</Txt>
                </Stack>
              </Stack>
            </Card>
            {/* DELETE ROLE */}
            <Card paddingY="10px" color={`var(--bcgov_lighter-blue4)`}>
              <Stack>
                <Stack direction="row">
                  <Txt bold>deleteRole</Txt>
                  <Txt>Remove a role.</Txt>
                </Stack>
                <hr />
                <Stack direction="row" center>
                  <input
                    type="text"
                    placeholder="Type a role name"
                    onChange={(e) => setDeleteRoleInput(e.target.value)}
                  ></input>
                  <Button
                    size="s"
                    onClick={() => {
                      if (deleteRoleInput !== '')
                        callAPI(APIRoutes.deleteRole(deleteRoleInput), 'DELETE');
                    }}
                  >
                    Remove
                  </Button>
                  <Txt size="s">Prints to console (async).</Txt>
                </Stack>
              </Stack>
            </Card>
          </Stack>
          <Stack direction="row">
            {/* GET IDIR USER */}
            <Card paddingY="10px">
              <Stack>
                <Stack direction="row">
                  <Txt bold>getIDIRUsers</Txt>
                  <Txt>Get user details.</Txt>
                </Stack>
                <hr />
                  <Stack>
                    <input
                      type="text"
                      placeholder="Type a user's first name"
                      onChange={(e) => setUserIDIRInputs({...userIDIRInputs, firstName: e.target.value})}
                    ></input>
                  <Stack direction="row" center>
                    <Button
                    size="s"
                    onClick={() => {
                      if (userIDIRInputs.firstName !== "")
                        callAPI(
                          "/cssAPI/user/idir-user",
                          "GET",
                          `?firstName=${userIDIRInputs.firstName}`,
                        );
                    }}
                  >
                    Search
                  </Button>
                  <Txt size="s">Prints to console (async).</Txt>
                  </Stack>
                </Stack>
              </Stack>
            </Card>
            {/* GET AZURE IDIR USER */}
            <Card paddingY="10px">
              <Stack>
                <Stack direction="row">
                  <Txt bold>getAzureIDIRUsers</Txt>
                  <Txt>Get user details.</Txt>
                </Stack>
                <hr />
                <Stack direction="row" center>
                  <input
                    type="text"
                    placeholder="Type a user's first name"
                    onChange={(e) => setUserAzureIDIRInputs({...userIDIRInputs, firstName: e.target.value})}
                  ></input>
                  <Button
                    size="s"
                    onClick={() => {
                      if (userAzureIDIRInputs.firstName !== "")
                        callAPI(
                          "/cssAPI/user/azure-user",
                          "GET",
                          `?firstName=${userIDIRInputs.firstName}`,
                        );
                    }}
                  >
                    Search
                  </Button>
                  <Txt size="s">Prints to console (async).</Txt>
                </Stack>
              </Stack>
            </Card>
          </Stack>
          <Stack direction="row">
            {/* Assign ROLE */}
            <Card paddingY="10px">
              <Stack>
                <Stack direction="row">
                  <Txt bold>assignUserRole</Txt>
                  <Txt>Assign user new role.</Txt>
                </Stack>
                <hr />
                <Stack direction="row" center>
                  <input
                    type="text"
                    placeholder="Type a role name"
                    onChange={(e) => setAssignUserRoleInput(e.target.value)}
                  ></input>
                  <Txt size="s">Prints to console (async).</Txt>
                </Stack>
              </Stack>
              <Stack>
                <hr />
                <Stack direction="row" center>
                  <input
                    type="text"
                    placeholder="Type a user GUID@idir"
                    onChange={(e) => setIDIRInput(e.target.value)}
                  ></input>
                  <Button
                    size="s"
                    onClick={() => {
                      if (IDIRInput !== "")
                        callAPI(
                          `/cssAPI/role/assign/${IDIRInput}?role=${assignUserRoleInput}`,
                          "POST"
                        );
                    }}
                  >
                    Assign
                  </Button>
                  <Txt size="s">Prints to console (async).</Txt>
                </Stack>
              </Stack>
            </Card>
          </Stack>
        </>
      ) : (
        <Card center paddingY="50px">
          <Stack center>
            <DeniedIcon />
            <Txt size="l">
              You must have the role `<b>playground-admin</b>` to use these functions.
            </Txt>
          </Stack>
        </Card>
      )}
    </>
  );
};

export default CSSAPIPage;
