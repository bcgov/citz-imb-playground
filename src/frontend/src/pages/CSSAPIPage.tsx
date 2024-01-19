import './Pages.css';
import { useEffect } from 'react';
import { Stack, Card, Txt } from 'components/common';
import { useKeycloak } from '@bcgov/citz-imb-kc-react';
import { DeniedIcon } from 'components/icons';
import { 
  GetMultipleRolesCard,
  IntegrationDetailsCard,
  PackagesCard, GetSingleRoleCard,
  CreateRoleCard,
  DeleteRoleCard,
  GetIDIRUserCard,
  GetAzureIDIRUserCard,
  AssignUserRoleCard,
  UnassignUserRoleCard,
} from 'components/pages/CSSAPI';

const CSSAPIPage = () => {
  const { hasRole, isAuthenticated } = useKeycloak();

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
            <GetIDIRUserCard />
            {/* GET AZURE IDIR USER */}
            <GetAzureIDIRUserCard />
          </Stack>
          <Stack direction="row">
            {/* Assign ROLE */}
            <AssignUserRoleCard />
            {/*Unassign ROLE */}
            <UnassignUserRoleCard />
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
