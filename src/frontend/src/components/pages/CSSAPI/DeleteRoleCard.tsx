import React, { useState } from "react";
import { Stack, Card, Txt, Button } from "components/common";
import { APIRoutes } from "utils";
import { useCallAPI } from "hooks";

export const DeleteRoleCard = () => {
  const API = useCallAPI();
  const [deleteRoleInput, setDeleteRoleInput] = useState('');

  return (
    <Card paddingY="10px" color={`var(--bcgov_lighter-blue4)`}>
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
              if (deleteRoleInput !== '')
              API.deleteMethod(APIRoutes.deleteRole(deleteRoleInput));
            }}
          >
            Remove
          </Button>
          <Txt size="s">Prints to console (async).</Txt>
        </Stack>
      </Stack>
    </Card>
  );
};
