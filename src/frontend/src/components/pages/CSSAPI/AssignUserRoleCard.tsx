import React, { useState } from "react";
import { Stack, Card, Txt, Button } from "components/common";
import { APIRoutes } from "utils";
import { useCallAPI } from "hooks";

export const AssignUserRoleCard = () => {
  const API = useCallAPI();
  const [userRoleInput, setUserRoleInput] = useState('');
  const [IDIRInput, setIDIRInput] = useState('');

  return (
    <Card paddingY="10px" color={`var(--bcgov_lighter-blue4)`}>
      <Stack>
        <Stack direction="row">
          <Txt bold>assignUserRole</Txt>
          <Txt>Assign user new role.</Txt>
        </Stack>
        <hr />
        <Stack direction="row" center>
          <input
            type="text"
            placeholder="Type a role name"
            onChange={(e) => setUserRoleInput(e.target.value)}
          ></input>
          <Txt size="s">Prints to console (async).</Txt>
        </Stack>
      </Stack>
      <Stack>
        <hr />
        <Stack direction="row" center>
          <input
            type="text"
            placeholder="Type a username"
            onChange={(e) => setIDIRInput(e.target.value)}
          ></input>
          <Button
            size="s"
            onClick={() => {
              if (IDIRInput !== "")
              API.postMethod(APIRoutes.assignUserRole(IDIRInput, userRoleInput));
            }}
          >
            Assign
          </Button>
          <Txt size="s">Prints to console (async).</Txt>
        </Stack>
      </Stack>
    </Card>
  );
};
