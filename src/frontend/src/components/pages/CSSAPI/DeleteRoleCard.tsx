import React, { useState } from "react";
import { Stack, Txt, Button } from "components/common";
import { APIRoutes } from "utils";
import { useCallAPI } from "hooks";
import { BaseAPICallCard } from "./BaseAPICallCard";

export const DeleteRoleCard = () => {
  const API = useCallAPI();
  const [deleteRoleInput, setDeleteRoleInput] = useState('');

  return (
    <BaseAPICallCard 
      title='deleteRole'
      description='Remove a role.'
    >
      <Stack direction="row" center>
          <input
            type="text"
            placeholder="Type a role name"
            onChange={(e) => setDeleteRoleInput(e.target.value)}
          />
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
    </BaseAPICallCard>
  );
};
