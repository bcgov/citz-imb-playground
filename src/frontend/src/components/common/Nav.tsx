import "./Nav.css";
import React from "react";
import { useKeycloak } from "@bcgov/citz-imb-kc-react";
import { Button } from "./Button";
import { Stack } from "./Stack";
import { GearsIcon, KeyIcon, TextIcon } from "components/icons";
import { useNavigate } from "react-router-dom";
import { Txt } from "./Txt";

export const Nav = () => {
  const { isAuthenticated, user, login, logout } = useKeycloak();
  const navigate = useNavigate();

  return (
    <nav>
      <h3>CITZ IMB Playground</h3>

      {isAuthenticated && (
        <Stack>
          <Button color="blue" onClick={() => navigate("/keycloak")}>
            <Stack direction="row" gap="10px">
              <KeyIcon />
              <p>Keycloak</p>
            </Stack>
          </Button>
          <Button color="blue" onClick={() => navigate("/cssapi")}>
            <Stack direction="row" gap="10px">
              <GearsIcon />
              <p>CSS API</p>
            </Stack>
          </Button>
          <Button color="blue" onClick={() => navigate("/richtext")}>
            <Stack direction="row" gap="10px">
              <TextIcon />
              <p>RichTextEditor</p>
            </Stack>
          </Button>
        </Stack>
      )}

      <div className="auth">
        {isAuthenticated && (
          <>
            <p>Hello,</p>
            <p className="displayName">{user?.display_name}</p>
          </>
        )}
        {!isAuthenticated ? (
          <>
            <Txt>Start by logging in!</Txt>
            <br />
            <Button color="blue" onClick={() => login({ idpHint: "idir" })}>
              LOGIN WITH IDIR
            </Button>
          </>
        ) : (
          <Button color="blue" onClick={() => logout()}>
            LOGOUT
          </Button>
        )}
      </div>
    </nav>
  );
};
