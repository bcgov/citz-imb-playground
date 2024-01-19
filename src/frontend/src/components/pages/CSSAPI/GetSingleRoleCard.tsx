import React, { useState } from "react";
import { Stack, Card, Txt, Button } from "components/common";
import { APIRoutes } from "utils";
import { useCallAPI } from "hooks";

export const GetSingleRoleCard = () => {
  const API = useCallAPI();
  const [getRoleInput, setGetRoleInput] = useState('');

  return (
    <Card paddingY="10px" color={`var(--bcgov_lighter-blue4)`}>
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
              if (getRoleInput !== '') API.getMethod(APIRoutes.getRole(getRoleInput));
            }}
          >
            Search
          </Button>
          <Txt size="s">Prints to console (async).</Txt>
        </Stack>
      </Stack>
    </Card>
  );
};
