import React, { useState } from "react";
import { Stack, Txt, Button } from "components/common";
import { APIRoutes } from "utils";
import { useCallAPI } from "hooks";
import { hasNoEmptyStringProperties } from "utils";
import { BaseAPICallCard } from "./BaseAPICallCard";

export const GetIDIRUserCard = () => {
  const API = useCallAPI();
  const [userInputs, setUserInputs] = useState({firstName: '', lastName: '', email: '', guid: ''});

  return (
    <BaseAPICallCard
      title='getIDIRUsers'
      description='Get user details.'
    >
      <Stack>
        <input
          type="text"
          placeholder="Type a user's first name"
          onChange={(e) => setUserInputs({...userInputs, firstName: e.target.value})}
        ></input>
        <input
          type="text"
          placeholder="Type a user's last name"
          onChange={(e) => setUserInputs({...userInputs, lastName: e.target.value})}
        ></input>
        <input
          type="text"
          placeholder="Type a user's email"
          onChange={(e) => setUserInputs({...userInputs, email: e.target.value})}
        ></input>
        <Stack direction="row" center>
          <Button
            size="s"
            onClick={() => {
              API.getMethod(APIRoutes.getIDIRUser(userInputs.firstName, userInputs.lastName, userInputs.email));
            }}
            disabled={hasNoEmptyStringProperties(userInputs)}
            >
            Search
          </Button>
          <Txt size="s">Prints to console (async).</Txt>
        </Stack>
      </Stack>
    </BaseAPICallCard>
  );
};
