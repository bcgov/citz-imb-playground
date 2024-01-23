import React, { useState } from "react";
import { Stack, Txt, Button } from "components/common";
import { APIRoutes } from "utils";
import { useCallAPI } from "hooks";
import { BaseAPICallCard } from "./BaseAPICallCard";

export const UnassignUserRoleCard = () => {
  const API = useCallAPI();
  const [userRoleInput, setUserRoleInput] = useState('');
  const [IDIRInput, setIDIRInput] = useState('');

  return (
    <BaseAPICallCard
      title='unassignUserRole'
      description='Unassign a user role.'
    >
      <Stack direction="row" center>
        <input
          type="text"
          placeholder="Type a role name"
          onChange={(e) => setUserRoleInput(e.target.value)}
        ></input>
        <Txt size="s">Prints to console (async).</Txt>
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
              API.deleteMethod(APIRoutes.unassignUserRole(IDIRInput, userRoleInput));
            }}
          >
            Unassign
          </Button>
          <Txt size="s">Prints to console (async).</Txt>
        </Stack>
      </Stack>
    </BaseAPICallCard>
  );
};
