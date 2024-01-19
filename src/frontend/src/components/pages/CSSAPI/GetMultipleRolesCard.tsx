import { Stack, Card, Txt, Button } from "components/common";
import { useCallAPI } from "hooks";
import { APIRoutes } from "utils";

export const GetMultipleRolesCard = () => {
  const API = useCallAPI();

  return (
    <Card paddingY="10px" color={`var(--bcgov_lighter-blue4)`}>
      <Stack>
        <Stack direction="row">
            <Txt bold>getRoles</Txt>
            <Txt>Get all roles from integration.</Txt>
        </Stack>
        <hr />
        <Stack direction="row" center>
            <Button size="s" onClick={() => API.getMethod(APIRoutes.getRoles)}>
            Search
            </Button>
            <Txt size="s">Prints to console (async).</Txt>
        </Stack>
      </Stack>
    </Card>
  )
};
