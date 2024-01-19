import React, { useState } from "react";
import { Stack, Card, Txt, Button } from "components/common";
import { APIRoutes } from "utils";
import { useCallAPI } from "hooks";

export const CreateRoleCard = () => {
  const API = useCallAPI();
  const [createRoleInput, setCreateRoleInput] = useState('');

  return (
    <Card paddingY="10px" color={`var(--bcgov_lighter-blue4)`}>
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
              if (createRoleInput !== '')
              API.postMethod(APIRoutes.createRole(createRoleInput));
            }}
          >
            Create
          </Button>
          <Txt size="s">Prints to console (async).</Txt>
        </Stack>
      </Stack>
    </Card>
  );
};
