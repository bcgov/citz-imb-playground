import React, { useState } from "react";
import { Stack, Txt, Button } from "components/common";
import { APIRoutes } from "utils";
import { useCallAPI } from "hooks";
import { BaseAPICallCard } from "./BaseAPICallCard";

export const CreateRoleCard = () => {
  const API = useCallAPI();
  const [createRoleInput, setCreateRoleInput] = useState('');

  return (
    <BaseAPICallCard
      title='createRole'
      description='Create a new role.'
    >
      <Stack direction="row" center>
        <input
          type="text"
          placeholder="Type a role name"
          onChange={(e) => setCreateRoleInput(e.target.value)}
        />
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
    </BaseAPICallCard>
  );
};
