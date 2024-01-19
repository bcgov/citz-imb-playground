import './Pages.css';
import { useEffect, useState } from 'react';
import { Stack } from 'components/common/Stack';
import { Card } from 'components/common/Card';
import { Txt } from 'components/common/Txt';
import { useKeycloak } from '@bcgov/citz-imb-kc-react';
import { DeniedIcon } from 'components/icons';
import { Button } from 'components/common/Button';
import { useCallAPI } from '../hooks';
import { checkEmptyInputs } from '../utils';
import { 
  GetMultipleRolesCard,
  IntegrationDetailsCard,
  PackagesCard, GetSingleRoleCard,
  CreateRoleCard,
  DeleteRoleCard,
} from 'components/pages/CSSAPI';

const CSSAPIPage = () => {
  const { hasRole, isAuthenticated } = useKeycloak();
  const API = useCallAPI();

  const [assignUserRoleInput, setAssignUserRoleInput] = useState('');
  const [userIDIRInputs, setUserIDIRInputs] = useState({firstName: '', lastName: '', email: '', guid: ''});
  const [userAzureIDIRInputs, setUserAzureIDIRInputs] = useState({firstName: '', lastName: '', email: '', guid: ''});
  const [IDIRInput, setIDIRInput] = useState('');

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
            <GetMultipleRolesCard />
            {/* GET ROLE */}
            <GetSingleRoleCard />
          </Stack>
          <Stack direction="row">
            {/* CREATE ROLE */}
            <CreateRoleCard />
            {/* DELETE ROLE */}
            <DeleteRoleCard />
          </Stack>
          <Stack direction="row">
            {/* GET IDIR USER */}
            <Card paddingY="10px" color={`var(--bcgov_lighter-blue4)`}>
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
                  <input
                    type="text"
                    placeholder="Type a user's last name"
                    onChange={(e) => setUserIDIRInputs({...userIDIRInputs, lastName: e.target.value})}
                  ></input>
                  <input
                    type="text"
                    placeholder="Type a user's email"
                    onChange={(e) => setUserIDIRInputs({...userIDIRInputs, email: e.target.value})}
                  ></input>
                  <Stack direction="row" center>
                    <Button
                      size="s"
                      onClick={() => {
                        API.getMethod(
                            "/cssapi/user/idir-user",
                            `?firstName=${userIDIRInputs.firstName}&lastName=${userIDIRInputs.lastName}&email=${userIDIRInputs.email}`,
                          );
                      }}
                      disabled={checkEmptyInputs(userIDIRInputs)}
                      >
                      Search
                    </Button>
                    <Txt size="s">Prints to console (async).</Txt>
                  </Stack>
                </Stack>
              </Stack>
            </Card>
            {/* GET AZURE IDIR USER */}
            <Card paddingY="10px" color={`var(--bcgov_lighter-blue4)`}>
              <Stack>
                <Stack direction="row">
                  <Txt bold>getAzureIDIRUsers</Txt>
                  <Txt>Get user details.</Txt>
                </Stack>
                <hr />
                <Stack>
                  <Stack>
                    <input
                      type="text"
                      placeholder="Type a user's first name"
                      onChange={(e) => setUserAzureIDIRInputs({...userAzureIDIRInputs, firstName: e.target.value})}
                    ></input>
                    <input
                      type="text"
                      placeholder="Type a user's last name"
                      onChange={(e) => setUserAzureIDIRInputs({...userAzureIDIRInputs, lastName: e.target.value})}
                    ></input>
                    <input
                      type="text"
                      placeholder="Type a user's email"
                      onChange={(e) => setUserAzureIDIRInputs({...userAzureIDIRInputs, email: e.target.value})}
                    ></input>
                    <Stack direction='row'>
                      <Button
                        size="s"
                        onClick={() => {
                          API.getMethod(
                              "/cssapi/user/azure-user",
                              `?firstName=${userAzureIDIRInputs.firstName}&lastName=${userAzureIDIRInputs.lastName}&email=${userAzureIDIRInputs.email}`,
                            );
                        }}
                        disabled={checkEmptyInputs(userAzureIDIRInputs)}
                      >
                        Search
                      </Button>
                      <Txt size="s">Prints to console (async).</Txt>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Card>
          </Stack>
          <Stack direction="row">
            {/* Assign ROLE */}
            <Card paddingY="10px" color={`var(--bcgov_lighter-blue4)`}>
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
                    placeholder="Type a username"
                    onChange={(e) => setIDIRInput(e.target.value)}
                  ></input>
                  <Button
                    size="s"
                    onClick={() => {
                      if (IDIRInput !== "")
                      API.postMethod(
                          `/cssapi/role/assign/${IDIRInput}?role=${assignUserRoleInput}`,
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
