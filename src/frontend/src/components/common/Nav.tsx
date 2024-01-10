import "./Nav.css";
import React from "react";
import { useKeycloak } from "@bcgov/citz-imb-kc-react";
import { Button } from "./Button";
import { Stack } from "./Stack";
import { GearsIcon, KeyIcon, TextIcon } from "components/icons";
import { useNavigate } from "react-router-dom";

export const Nav = () => {
  const { user, login, logout } = useKeycloak();
  const navigate = useNavigate();

  return (
    <nav>
      <h3>CITZ IMB Playground</h3>

      {user && (
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
        </Stack>
      )}

      <div className="auth">
        {user && (
          <>
            <p>Hello,</p>
            <p className="displayName">{user?.display_name}</p>
          </>
        )}
        {!user ? (
          <Button color="blue" onClick={() => login({ idpHint: "idir" })}>
            LOGIN WITH IDIR
          </Button>
        ) : (
          <Button color="blue" onClick={() => logout()}>
            LOGOUT
          </Button>
        )}
      </div>
    </nav>
  );
};
