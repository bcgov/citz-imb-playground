import './Pages.css';
import React, { useEffect, useState } from 'react';
import { Card, Link, Txt, Stack, Button } from 'components/common';
import { RichTextEditor } from '@bcgov/citz-imb-richtexteditor';
import { useKeycloak } from '@bcgov/citz-imb-kc-react';
import { IssuesIcon } from 'components/icons';

const RichTextEditorPage = () => {
  const { isAuthenticated } = useKeycloak();

  const [richText, setRichText] = useState('');

  const versions = window.configuration?.packageVersions;
  const latestVersions = window.configuration?.latestPackageVersions;
  const issues = window.configuration?.packageIssues;

  // Redirect if not logged in.
  useEffect(() => {
    if (!isAuthenticated) setTimeout(() => (window.location.href = '/'), 500);
  }, [isAuthenticated]);

  return (
    <>
      <Card>
        <Stack>
          <h4>Packages</h4>
          <hr />
          <Stack direction="row" gap="30px" center>
            <Txt>@bcgov/citz-imb-richtexteditor</Txt>
            <Stack direction="row">
              <Txt size="s" bold>
                Latest Version:
              </Txt>
              <Txt size="s">
                {latestVersions &&
                latestVersions.hasOwnProperty('https://github.com/bcgov/citz-imb-richtexteditor')
                  ? latestVersions['https://github.com/bcgov/citz-imb-richtexteditor']
                  : '-'}
              </Txt>
            </Stack>
            <Stack direction="row">
              <Txt size="s" bold>
                Current Version:
              </Txt>
              <Txt size="s">
                {versions && versions.hasOwnProperty('@bcgov/citz-imb-richtexteditor')
                  ? versions['@bcgov/citz-imb-richtexteditor']
                  : '-'}
              </Txt>
            </Stack>
            <Stack direction="row">
              <Txt size="s" bold>
                Repo:
              </Txt>
              <Link size="s">https://github.com/bcgov/citz-imb-richtexteditor</Link>
            </Stack>
            <Button
              onClick={() =>
                window.open('https://github.com/bcgov/citz-imb-richtexteditor/issues', '_blank')
              }
            >
              <Stack direction="row" center>
                <Txt>
                  [
                  <b>
                    {issues &&
                    issues.hasOwnProperty('https://github.com/bcgov/citz-imb-richtexteditor')
                      ? issues['https://github.com/bcgov/citz-imb-richtexteditor']
                      : 0}
                  </b>
                  ]
                </Txt>
                <Txt>GitHub Issues</Txt>
                <IssuesIcon />
              </Stack>
            </Button>
          </Stack>
        </Stack>
      </Card>
      <Card>
        <RichTextEditor content={richText} setContent={setRichText} />
      </Card>
      <Card height="300px">{richText}</Card>
    </>
  );
};

export default RichTextEditorPage;
