import React, { useState } from "react";
import { Stack, Card, Txt, Button } from "components/common";
import { APIRoutes } from "utils";
import { useCallAPI } from "hooks";
import { checkEmptyInputs } from "utils";

export const GetIDIRUserCard = () => {
  const API = useCallAPI();
  const [userInputs, setUserInputs] = useState({firstName: '', lastName: '', email: '', guid: ''});

  return (
    <Card paddingY="10px" color={`var(--bcgov_lighter-blue4)`}>
      <Stack>
        <Stack direction="row">
          <Txt bold>getIDIRUsers</Txt>
          <Txt>Get user details.</Txt>
        </Stack>
        <hr />
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
              disabled={checkEmptyInputs(userInputs)}
              >
              Search
            </Button>
            <Txt size="s">Prints to console (async).</Txt>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};
