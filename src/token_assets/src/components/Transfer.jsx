import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import { canisterId, createActor } from "../../../declarations/token";
import { AuthClient } from "@dfinity/auth-client";

function Transfer() {
  // UseState Hooks

  const [recipientId, setRecipientId] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isHidden, setIsHidden] = useState(true);

  // handleClick Function

  async function handleClick() {
    setIsHidden(true);
    const recipient = Principal.fromText(recipientId);
    const amountTransfer = Number(transferAmount);
    setIsDisabled(true);

    const authClient = await AuthClient.create();
    const identity = await AuthClient.getIdentity();

    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });

    const transferFeed = await authenticatedCanister.transfer(
      recipient,
      amountTransfer
    );
    // 2vxsx-fae
    setIsHidden(false);
    setIsDisabled(false);
    setFeedback(transferFeed);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={recipientId}
                onChange={(e) => setRecipientId(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={isDisabled}>
            Transfer
          </button>
        </p>
        <p hidden={isHidden}> {feedback} </p>
      </div>
    </div>
  );
}

export default Transfer;
