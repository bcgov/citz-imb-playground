import './Pages.css';
import React from 'react';
import { Card, Txt, Stack } from 'components/common';
import { LeftArrowIcon } from 'components/icons';
import { useKeycloak } from '@bcgov/citz-imb-kc-react';

const LandingPage = () => {
  const { isAuthenticated } = useKeycloak();
  return (
    <>
      {isAuthenticated && (
        <Card center paddingY="80px" height="100%">
          <Stack center>
            <img src="./src/assets/family.png" width="350px" />
            <h3>Welcome to your CITZ IMB Playground!</h3>
            <Txt size="l">Select an option from the navigation menu.</Txt>
            <LeftArrowIcon />
          </Stack>
        </Card>
      )}
    </>
  );
};

export default LandingPage;
