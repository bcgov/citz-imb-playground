import React, { useState } from "react";
import { Stack, Card, Txt, Button } from "components/common";
import { APIRoutes } from "utils";
import { useCallAPI } from "hooks";
import { BaseAPICallCard } from "./BaseAPICallCard";

export const AssignUserRoleCard = () => {
  const API = useCallAPI();
  const [userRoleInput, setUserRoleInput] = useState('');
  const [IDIRInput, setIDIRInput] = useState('');

  return (
    <BaseAPICallCard 
        title='assignUserRole'
        description='Assign user a new role'
    >
      <Stack direction="row" center>
        <input
          type="text"
          placeholder="Type a role name"
          onChange={(e) => setUserRoleInput(e.target.value)}
        />
        <Txt size="s">Prints to console (async).</Txt>
      </Stack>
      <Stack>
        <hr />
        <Stack direction="row" center>
          <input
            type="text"
            placeholder="Type a username"
            onChange={(e) => setIDIRInput(e.target.value)}
          />
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
    </BaseAPICallCard>
  );
};
