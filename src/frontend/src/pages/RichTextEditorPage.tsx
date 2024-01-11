import "./Pages.css";
import React, { useEffect, useState } from "react";
import { Stack } from "components/common/Stack";
import { Card } from "components/common/Card";
import { Txt } from "components/common/Txt";
import { Link } from "components/common/Link";
import { RichTextEditor } from "@bcgov/citz-imb-richtexteditor";
import { useKeycloak } from "@bcgov/citz-imb-kc-react";

const RichTextEditorPage = () => {
  const { isAuthenticated } = useKeycloak();

  const [richText, setRichText] = useState("");

  const versions = window.configuration?.packageVersions;
  const latestVersions = window.configuration?.latestPackageVersions;

  // Redirect if not logged in.
  useEffect(() => {
    if (!isAuthenticated) setTimeout(() => (window.location.href = "/"), 1000);
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
                latestVersions.hasOwnProperty(
                  "https://github.com/bcgov/citz-imb-richtexteditor"
                )
                  ? latestVersions[
                      "https://github.com/bcgov/citz-imb-richtexteditor"
                    ]
                  : "-"}
              </Txt>
            </Stack>
            <Stack direction="row">
              <Txt size="s" bold>
                Current Version:
              </Txt>
              <Txt size="s">
                {versions &&
                versions.hasOwnProperty("@bcgov/citz-imb-richtexteditor")
                  ? versions["@bcgov/citz-imb-richtexteditor"]
                  : "-"}
              </Txt>
            </Stack>
            <Stack direction="row">
              <Txt size="s" bold>
                Repo:
              </Txt>
              <Link size="s">
                https://github.com/bcgov/citz-imb-richtexteditor
              </Link>
            </Stack>
          </Stack>
        </Stack>
      </Card>
      <Card>
        <RichTextEditor content={richText} setContent={setRichText} />
      </Card>
    </>
  );
};

export default RichTextEditorPage;
