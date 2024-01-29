/* eslint-disable @typescript-eslint/no-explicit-any */
import '../Pages.css';
import './styles.css';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useKeycloak } from '@bcgov/citz-imb-kc-react';
import { Card, Dropdown, Txt, Stack, Button } from 'components/common';
import { DeniedIcon } from 'components/icons';
import { IntegrationDetailsCard, PackagesCard } from 'components/pages/CSSAPI';
import { useCallAPI } from 'hooks';
import { APIRoutes, hasNoEmptyStringProperties } from 'utils';
import { apiFunctions } from './apiFunctions';

const CSSAPIPage = () => {
  const { hasRole, isAuthenticated } = useKeycloak();
  const API = useCallAPI();

  // Redirect if not logged in.
  useEffect(() => {
    if (!isAuthenticated) setTimeout(() => (window.location.href = '/'), 500);
  }, [isAuthenticated]);

  const [selectedFunction, setSelectedFunction] = useState<any>(undefined);
  const [pathParamInput, setPathParmaInput] = useState<string | undefined>(undefined);
  const [queryParamsInput, setQueryParamsInput] = useState<string | undefined>(undefined);
  const [apiCallOuput, setAPICallOutput] = useState<any>(null);

  const dropdownOptions = apiFunctions.map((item) => {
    return { value: item.function, label: item.function };
  });

  type APIHookMethod = 'getMethod' | 'postMethod' | 'putMethod' | 'patchMethod' | 'deleteMethod';

  type APIRoute = 'getRoles' | 'getIntegration';
  type APIRouteWithParam = 'getRole' | 'createRole' | 'deleteRole';
  type APIRouteWithQuery = 'getIDIRUsers' | 'getAzureIDIRUsers';
  type APIRouteWithParamAndQuery = 'assignUserRole' | 'unassignUserRole';

  const makeAPICall = async () => {
    const apiHookMethod = `${selectedFunction.method.toLowerCase()}Method` as APIHookMethod;
    const apiRoute = selectedFunction.function;
    console.log(apiRoute);

    if (pathParamInput && pathParamInput !== '' && queryParamsInput) {
      if (queryParamsInput) {
        setAPICallOutput(
          await API[apiHookMethod](
            APIRoutes[apiRoute as APIRouteWithParamAndQuery](
              pathParamInput,
              JSON.parse(queryParamsInput),
            ),
          ),
        );
      }
    } else if (pathParamInput && pathParamInput !== '') {
      setAPICallOutput(
        await API[apiHookMethod](APIRoutes[apiRoute as APIRouteWithParam](pathParamInput)),
      );
    } else if (queryParamsInput) {
      setAPICallOutput(
        await API[apiHookMethod](
          APIRoutes[apiRoute as APIRouteWithQuery](JSON.parse(queryParamsInput)),
        ),
      );
    } else {
      setAPICallOutput(await API[apiHookMethod](APIRoutes[apiRoute as APIRoute]));
    }
  };

  const handleDropdownChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const apiFunction =
      apiFunctions.filter((item) => item.function === e.target.value)[0] ?? undefined;

    setQueryParamsInput(undefined);
    setPathParmaInput(undefined);

    if (apiFunction?.query) setQueryParamsInput(JSON.stringify(apiFunction.query, null, 2));
    setSelectedFunction(apiFunction);
  };

  return (
    <>
      <PackagesCard />
      {hasRole(['playground-admin']) ? (
        <>
          <IntegrationDetailsCard />
          <Stack direction="row">
            <Stack minWidth="500px">
              <Card color="var(--bcgov_lighter-blue4)">
                <Stack center>
                  <Txt bold>API function: </Txt>
                  <Dropdown
                    options={dropdownOptions}
                    placeholder="Select one"
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => handleDropdownChange(e)}
                  />
                  <p>{selectedFunction?.description}</p>
                  {selectedFunction?.method && (
                    <Button
                      onClick={() => makeAPICall()}
                      disabled={
                        (selectedFunction?.param !== '' && !pathParamInput) ||
                        (selectedFunction?.query && hasNoEmptyStringProperties(queryParamsInput))
                      }
                    >
                      {selectedFunction.method}
                    </Button>
                  )}
                </Stack>
              </Card>
              <Card color="var(--bcgov_lighter-blue4)">
                <Stack center>
                  {selectedFunction?.param && (
                    <>
                      <Txt bold>Path param: </Txt>
                      <input
                        type="text"
                        placeholder={selectedFunction.param}
                        onChange={(e) => setPathParmaInput(e.target.value)}
                      />
                    </>
                  )}
                  {selectedFunction?.query && (
                    <>
                      <Txt bold>Query params: </Txt>
                      <textarea
                        value={queryParamsInput}
                        onChange={(e) => setQueryParamsInput(e.target.value)}
                      />
                    </>
                  )}
                </Stack>
              </Card>
            </Stack>
            <Card color="#333" className="codeCard">
              <Txt bold color="var(--white)">
                Output:
              </Txt>
              <code>{apiCallOuput && JSON.stringify(apiCallOuput, null, 2)}</code>
            </Card>
          </Stack>
        </>
      ) : (
        <Card center paddingY="50px">
          <Stack center>
            <DeniedIcon />
            <Txt size="l">
              You must have the role `<b>playground-admin</b>` to use these functions.
            </Txt>
          </Stack>
        </Card>
      )}
    </>
  );
};

export default CSSAPIPage;
