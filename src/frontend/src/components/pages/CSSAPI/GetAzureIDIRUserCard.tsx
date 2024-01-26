import React, { useState } from "react";
import { Stack, Txt, Button } from "components/common";
import { APIRoutes } from "utils";
import { useCallAPI } from "hooks";
import { hasNoEmptyStringProperties } from "utils";
import { BaseAPICallCard } from "./BaseAPICallCard";

export const GetAzureIDIRUserCard = () => {
  const API = useCallAPI();
  const [userInputs, setUserInputs] = useState({firstName: '', lastName: '', email: '', guid: ''});

  return (
    <BaseAPICallCard
      title='getAzureIDIRUsers'
      description='Get user details.'
    >
      <Stack>
        <Stack>
          <input
            type="text"
            placeholder="Type a user's first name"
            onChange={(e) => setUserInputs({...userInputs, firstName: e.target.value})}
          />
          <input
            type="text"
            placeholder="Type a user's last name"
            onChange={(e) => setUserInputs({...userInputs, lastName: e.target.value})}
          />
          <input
            type="text"
            placeholder="Type a user's email"
            onChange={(e) => setUserInputs({...userInputs, email: e.target.value})}
          />
          <Stack direction='row'>
            <Button
              size="s"
              onClick={() => {
                API.getMethod(APIRoutes.getAzureIDIRUser(userInputs.firstName, userInputs.lastName, userInputs.email));
              }}
              disabled={hasNoEmptyStringProperties(userInputs)}
            >
              Search
            </Button>
            <Txt size="s">Prints to console (async).</Txt>
          </Stack>
        </Stack>
      </Stack>
    </BaseAPICallCard>
  );
};
