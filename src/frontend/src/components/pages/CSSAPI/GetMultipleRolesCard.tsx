import { Stack, Txt, Button } from "components/common";
import { useCallAPI } from "hooks";
import { APIRoutes } from "utils";
import { BaseAPICallCard } from "./BaseAPICallCard";

export const GetMultipleRolesCard = () => {
  const API = useCallAPI();

  return (
    <BaseAPICallCard
      title='getRoles'
      description='Get all roles from integration'
    >
        <Stack direction="row" center>
          <Button size="s" onClick={() => API.getMethod(APIRoutes.getRoles)}>
          Search
          </Button>
          <Txt size="s">Prints to console (async).</Txt>
        </Stack>
    </BaseAPICallCard>
  );
};
