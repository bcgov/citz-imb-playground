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
  const [createRoleInput, setCreateRoleInput] = useState("");
  const [deleteRoleInput, setDeleteRoleInput] = useState("");

  const [integrationDetails, setIntegrationDetails] = useState<any>(undefined);

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

      const data = await response.json();
      if (data) return console.log(data);
      console.log(`Completed with status ${response.status}.`);
    } catch (error) {
      console.error(error);
    }
  };

  const formatDateString = (isoDateString: string) => {
    const date = new Date(isoDateString);

    const formatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    return formatter.format(date);
  };

  // Redirect if not logged in.
  useEffect(() => {
    if (!isAuthenticated) setTimeout(() => (window.location.href = "/"), 1000);
  }, [isAuthenticated]);

  // Update integration details.
  useEffect(() => {
    try {
      (async () => {
        const response = await fetch(`/api/cssAPI/integration`, {
          method: "GET",
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
          {/* INTEGRATION */}
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
                    <Txt size="s">
                      {JSON.stringify(integrationDetails?.environments)}
                    </Txt>
                  </Stack>
                  <Stack direction="row" center>
                    <Txt size="s" bold>
                      Created:
                    </Txt>
                    <Txt size="s">
                      {formatDateString(integrationDetails?.createdAt)}
                    </Txt>
                  </Stack>
                </Stack>
              ) : (
                <Txt>Searching for details...</Txt>
              )}
            </Stack>
          </Card>
          <Stack direction="row">
            {/* GET ROLES */}
            <Card paddingY="10px">
              <Stack>
                <Stack direction="row">
                  <Txt bold>getRoles</Txt>
                  <Txt>Get all roles from integration.</Txt>
                </Stack>
                <hr />
                <Stack direction="row" center>
                  <Button
                    size="s"
                    onClick={() => callAPI("/cssAPI/role/roles", "GET")}
                  >
                    Search
                  </Button>
                  <Txt size="s">Prints to console (async).</Txt>
                </Stack>
              </Stack>
            </Card>
            {/* GET ROLE */}
            <Card paddingY="10px">
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
                        callAPI("/cssAPI/role", "GET", `?role=${getRoleInput}`);
                    }}
                  >
                    Search
                  </Button>
                  <Txt size="s">Prints to console (async).</Txt>
                </Stack>
              </Stack>
            </Card>
          </Stack>
          <Stack direction="row">
            {/* CREATE ROLE */}
            <Card paddingY="10px">
              <Stack>
                <Stack direction="row">
                  <Txt bold>createRole</Txt>
                  <Txt>Create a new role.</Txt>
                </Stack>
                <hr />
                <Stack direction="row" center>
                  <input
                    type="text"
                    placeholder="Type a role name"
                    onChange={(e) => setCreateRoleInput(e.target.value)}
                  ></input>
                  <Button
                    size="s"
                    onClick={() => {
                      if (createRoleInput !== "")
                        callAPI(`/cssAPI/role/${createRoleInput}`, "POST");
                    }}
                  >
                    Create
                  </Button>
                  <Txt size="s">Prints to console (async).</Txt>
                </Stack>
              </Stack>
            </Card>
            {/* DELETE ROLE */}
            <Card paddingY="10px">
              <Stack>
                <Stack direction="row">
                  <Txt bold>deleteRole</Txt>
                  <Txt>Remove a role.</Txt>
                </Stack>
                <hr />
                <Stack direction="row" center>
                  <input
                    type="text"
                    placeholder="Type a role name"
                    onChange={(e) => setDeleteRoleInput(e.target.value)}
                  ></input>
                  <Button
                    size="s"
                    onClick={() => {
                      if (deleteRoleInput !== "")
                        callAPI(`/cssAPI/role/${deleteRoleInput}`, "DELETE");
                    }}
                  >
                    Remove
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
