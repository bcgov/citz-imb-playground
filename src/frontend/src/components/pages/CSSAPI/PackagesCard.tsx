import React from 'react';
import { Card, Link, Txt, Stack, Button } from 'components/common';
import { IssuesIcon } from 'components/icons';

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
          <Button
            onClick={() =>
              window.open('https://github.com/bcgov/citz-imb-kc-css-api/issues', '_blank')
            }
          >
            <Stack direction="row" center>
              <Txt>
                [<b>0</b>]
              </Txt>
              <Txt>GitHub Issues</Txt>
              <IssuesIcon />
            </Stack>
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
};
