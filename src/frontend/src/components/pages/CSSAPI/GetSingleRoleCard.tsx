import React, { useState } from "react";
import { Stack, Card, Txt, Button } from "components/common";
import { APIRoutes } from "utils";
import { useCallAPI } from "hooks";
import { BaseAPICallCard } from "./BaseAPICallCard";

export const GetSingleRoleCard = () => {
  const API = useCallAPI();
  const [getRoleInput, setGetRoleInput] = useState('');

  return (
    <BaseAPICallCard
      title='getRole'
      description='Get role details.'
    >
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
    </BaseAPICallCard>
  );
};
