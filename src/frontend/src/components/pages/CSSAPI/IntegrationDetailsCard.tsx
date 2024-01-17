import React, { useEffect, useState } from 'react';
import { Stack } from 'components/common/Stack';
import { Card } from 'components/common/Card';
import { Txt } from 'components/common/Txt';
import { useKeycloak } from '@bcgov/citz-imb-kc-react';
import { APIRoutes, formatDateString } from '../../../utils';

export const IntegrationDetailsCard = () => {
  const { getAuthorizationHeaderValue } = useKeycloak();
  const [integrationDetails, setIntegrationDetails] = useState<any>(undefined);

  // Update integration details.
  useEffect(() => {
    try {
      (async () => {
        const response = await fetch(APIRoutes.getIntegration, {
          method: 'GET',
          headers: { Authorization: getAuthorizationHeaderValue() },
        });

        const data = await response.json();
        if (data) setIntegrationDetails(data);
      })();
    } catch (error) {
      console.error(error);
    }
  }, [window.location.origin]);

  return (
    <Card paddingY="10px">
      <Stack>
        <h4>Integration Details</h4>
        <hr />
        {integrationDetails ? (
          <Stack direction="row" gap="40px">
            <Stack direction="row" center>
              <Txt size="s" bold>
                ID:
              </Txt>
              <Txt size="s">{integrationDetails?.id}</Txt>
            </Stack>
            <Stack direction="row" center>
              <Txt size="s" bold>
                Project Name:
              </Txt>
              <Txt size="s">{integrationDetails?.projectName}</Txt>
            </Stack>
            <Stack direction="row" center>
              <Txt size="s" bold>
                Auth Type:
              </Txt>
              <Txt size="s">{integrationDetails?.authType}</Txt>
            </Stack>
            <Stack direction="row" center>
              <Txt size="s" bold>
                Status:
              </Txt>
              <Txt size="s">{integrationDetails?.status}</Txt>
            </Stack>
            <Stack direction="row" center>
              <Txt size="s" bold>
                Environments:
              </Txt>
              <Txt size="s">{JSON.stringify(integrationDetails?.environments)}</Txt>
            </Stack>
            <Stack direction="row" center>
              <Txt size="s" bold>
                Created:
              </Txt>
              <Txt size="s">{formatDateString(integrationDetails?.createdAt)}</Txt>
            </Stack>
          </Stack>
        ) : (
          <Txt>Searching for details...</Txt>
        )}
      </Stack>
    </Card>
  );
};
