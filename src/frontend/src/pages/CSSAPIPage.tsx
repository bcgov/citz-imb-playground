import "./Pages.css";
import React, { useEffect, useState } from "react";
import { Stack } from "components/common/Stack";
import { Card } from "components/common/Card";
import { Txt } from "components/common/Txt";
import { Link } from "components/common/Link";
import { useKeycloak } from "@bcgov/citz-imb-kc-react";
import { DeniedIcon } from "components/icons";
import { Button } from "components/common/Button";

const CSSAPIPage = () => {
  const { hasRole, getAuthorizationHeaderValue, isAuthenticated } =
    useKeycloak();

  const [getRoleInput, setGetRoleInput] = useState("");

  const versions = window.configuration?.packageVersions;
  const latestVersions = window.configuration?.latestPackageVersions;

  type RequestMethod = "GET" | "PUT" | "POST" | "DELETE";

  const callAPI = async (
    endpoint: string,
    method: RequestMethod,
    query?: string
  ) => {
    try {
      console.log("Calling API...");
      const response = await fetch(`/api${endpoint}${query ?? ""}`, {
        method,
        headers: { Authorization: getAuthorizationHeaderValue() },
      });

      if ([200, 201].includes(response.status))
        return console.log(await response.json());
      console.log(response.text());
    } catch (error) {
      console.error(error);
    }
  };

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
            <Txt>@bcgov/citz-imb-kc-css-api</Txt>
            <Stack direction="row">
              <Txt size="s" bold>
                Latest Version:
              </Txt>
              <Txt size="s">
                {latestVersions &&
                latestVersions.hasOwnProperty(
                  "https://github.com/bcgov/citz-imb-kc-css-api"
                )
                  ? latestVersions[
                      "https://github.com/bcgov/citz-imb-kc-css-api"
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
                versions.hasOwnProperty("@bcgov/citz-imb-kc-css-api")
                  ? versions["@bcgov/citz-imb-kc-css-api"]
                  : "-"}
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
      {hasRole(["playground-admin"]) ? (
        <>
          <Stack direction="row">
            {/* GET ROLES */}
            <Card>
              <Stack>
                <Stack direction="row">
                  <Txt bold>getRoles</Txt>
                  <Txt>Get all roles from integration.</Txt>
                </Stack>
                <hr />
                <Stack direction="row" center>
                  <Button
                    size="s"
                    onClick={() => callAPI("/cssAPI/getRoles", "GET")}
                  >
                    Search
                  </Button>
                  <Txt size="s">Prints to console (async).</Txt>
                </Stack>
              </Stack>
            </Card>
            {/* GET ROLE */}
            <Card>
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
                      if (getRoleInput !== "")
                        callAPI(
                          "/cssAPI/getRole",
                          "GET",
                          `?role=${getRoleInput}`
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
        </>
      ) : (
        <Card center paddingY="50px">
          <Stack center>
            <DeniedIcon />
            <Txt size="l">
              You must have the role `<b>playground-admin</b>` to use these
              functions.
            </Txt>
          </Stack>
        </Card>
      )}
    </>
  );
};

export default CSSAPIPage;
