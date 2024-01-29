import React from 'react';
import { Card, Link, Txt, Stack } from 'components/common';

export const PackagesCard = () => {
  const versions = window.configuration?.packageVersions;
  const latestVersions = window.configuration?.latestPackageVersions;

  return (
    <Card>
      <Stack>
        <h4>Packages</h4>
        <hr />
        <Stack direction="row" gap="30px" center>
          <Txt>@bcgov/citz-imb-kc-css-api</Txt>
          <Stack direction="row">
            <Txt size="s" bold>
              Latest Version:
            </Txt>
            <Txt size="s">
              {latestVersions &&
              latestVersions.hasOwnProperty('https://github.com/bcgov/citz-imb-kc-css-api')
                ? latestVersions['https://github.com/bcgov/citz-imb-kc-css-api']
                : '-'}
            </Txt>
          </Stack>
          <Stack direction="row">
            <Txt size="s" bold>
              Current Version:
            </Txt>
            <Txt size="s">
              {versions && versions.hasOwnProperty('@bcgov/citz-imb-kc-css-api')
                ? versions['@bcgov/citz-imb-kc-css-api']
                : '-'}
            </Txt>
          </Stack>
          <Stack direction="row">
            <Txt size="s" bold>
              Repo:
            </Txt>
            <Link size="s">https://github.com/bcgov/citz-imb-kc-css-api</Link>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};
