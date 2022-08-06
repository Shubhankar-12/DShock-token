import React, { useState } from "react";
import { token, canisterId, createActor } from "../../../declarations/token";
import { AuthClient } from "@dfinity/auth-client";

function Faucet() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [payText, setPayText] = useState("Gimme gimme");

  async function handleClick(event) {
    const authClient = await AuthClient.create();
    const identity = await AuthClient.getIdentity();

    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });

    setIsDisabled(true);
    const btnTxt = await token.authenticatedCanister.payOut();
    setPayText(btnTxt);
    // setIsDisabled(false);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>
        Get your free DShock tokens here! Claim 10,000 DSH tokens to your
        account.
      </label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled={isDisabled}>
          {payText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
