import "./Pages.css";
import React from "react";
import { Stack } from "components/common/Stack";
import { Card } from "components/common/Card";
import { KeycloakIdirUser, useKeycloak } from "@bcgov/citz-imb-kc-react";
import { Txt } from "components/common/Txt";
import { Link } from "components/common/Link";

const KeycloakPage = () => {
  const { user } = useKeycloak();
  const versions = window.configuration?.packageVersions;
  const latestVersions = window.configuration?.latestPackageVersions;
  return (
    <>
      <Card>
        <Stack>
          <h4>Packages</h4>
          <hr />
          <Stack direction="row" gap="30px" center>
            <Txt>@bcgov/citz-imb-kc-react</Txt>
            <Stack direction="row">
              <Txt size="s" bold>
                Latest Version:
              </Txt>
              <Txt size="s">
                {latestVersions &&
                latestVersions.hasOwnProperty(
                  "https://github.com/bcgov/citz-imb-kc-react"
                )
                  ? latestVersions["https://github.com/bcgov/citz-imb-kc-react"]
                  : "-"}
              </Txt>
            </Stack>
            <Stack direction="row">
              <Txt size="s" bold>
                Current Version:
              </Txt>
              <Txt size="s">
                {versions && versions.hasOwnProperty("@bcgov/citz-imb-kc-react")
                  ? versions["@bcgov/citz-imb-kc-react"]
                  : "-"}
              </Txt>
            </Stack>
            <Stack direction="row">
              <Txt size="s" bold>
                Repo:
              </Txt>
              <Link size="s">https://github.com/bcgov/citz-imb-kc-react</Link>
            </Stack>
          </Stack>
          <Stack direction="row" gap="30px" center>
            <Txt>@bcgov/citz-imb-kc-express</Txt>
            <Stack direction="row">
              <Txt size="s" bold>
                Latest Version:
              </Txt>
              <Txt size="s">
                {latestVersions &&
                latestVersions.hasOwnProperty(
                  "https://github.com/bcgov/citz-imb-kc-express"
                )
                  ? latestVersions[
                      "https://github.com/bcgov/citz-imb-kc-express"
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
                versions.hasOwnProperty("@bcgov/citz-imb-kc-express")
                  ? versions["@bcgov/citz-imb-kc-express"]
                  : "-"}
              </Txt>
            </Stack>
            <Stack direction="row">
              <Txt size="s" bold>
                Repo:
              </Txt>
              <Link size="s">https://github.com/bcgov/citz-imb-kc-express</Link>
            </Stack>
          </Stack>
        </Stack>
      </Card>
      <Stack direction="row" gap="10px">
        <Card>
          <Stack>
            <h4>User Data</h4>
            <hr />
            {/* NAME */}
            <Stack direction="row" gap="10px">
              <Txt size="s" bold>
                Name:
              </Txt>
              <Txt size="s">{user?.name}</Txt>
            </Stack>
            {/* DISPLAY NAME */}
            <Stack direction="row" gap="10px">
              <Txt size="s" bold>
                Display Name:
              </Txt>
              <Txt size="s">{user?.display_name}</Txt>
            </Stack>
            {/* EMAIL */}
            <Stack direction="row" gap="10px">
              <Txt size="s" bold>
                Email:
              </Txt>
              <Txt size="s">{user?.email}</Txt>
            </Stack>
            {/* IDENTITY PROVIDER */}
            <Stack direction="row" gap="10px">
              <Txt size="s" bold>
                Identity Provider:
              </Txt>
              <Txt size="s">{user?.identity_provider}</Txt>
            </Stack>
            {/* PREFERRED USERNAME */}
            <Stack direction="row" gap="10px">
              <Txt size="s" bold>
                Preferred Username:
              </Txt>
              <Txt size="s">{user?.preferred_username}</Txt>
            </Stack>
            {/* SCOPE */}
            {user?.scope && (
              <Stack direction="row" gap="10px">
                <Txt size="s" bold>
                  Scope:
                </Txt>
                <Txt size="s">{user?.scope}</Txt>
              </Stack>
            )}
            {user?.identity_provider === "idir" && (
              <>
                {/* GUID */}
                <Stack direction="row" gap="10px">
                  <Txt size="s" bold>
                    GUID:
                  </Txt>
                  <Txt size="s">
                    {(user as KeycloakIdirUser)?.idir_user_guid}
                  </Txt>
                </Stack>
                {/* Username */}
                <Stack direction="row" gap="10px">
                  <Txt size="s" bold>
                    Username:
                  </Txt>
                  <Txt size="s">
                    {(user as KeycloakIdirUser)?.idir_username}
                  </Txt>
                </Stack>
                {/* GIVEN NAME */}
                <Stack direction="row" gap="10px">
                  <Txt size="s" bold>
                    Given Name:
                  </Txt>
                  <Txt size="s">{(user as KeycloakIdirUser)?.given_name}</Txt>
                </Stack>
                {/* FAMILY NAME */}
                <Stack direction="row" gap="10px">
                  <Txt size="s" bold>
                    Family Name:
                  </Txt>
                  <Txt size="s">{(user as KeycloakIdirUser)?.family_name}</Txt>
                </Stack>
              </>
            )}
          </Stack>
        </Card>
      </Stack>
    </>
  );
};

export default KeycloakPage;
