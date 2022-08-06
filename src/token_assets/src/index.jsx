import ReactDOM from "react-dom";
import React from "react";
import App from "./components/App";
import { AuthClient } from "@dfinity/auth-client";

const init = async () => {
  const authClient = await AuthClient.create();

  if (authClient.isAuthenticated()) {
    console.log("Logged in");
    hanleAuthenticate(authClient);
  } else {
    await authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: () => {
        hanleAuthenticate(authClient);
      },
    });
  }
};

const hanleAuthenticate = async (authClient) => {
  const identity = await authClient.getIdentity();
  const usrPrinciPal = identity._principal.toString();
  ReactDOM.render(<App />, document.getElementById("root"));
};

init();
