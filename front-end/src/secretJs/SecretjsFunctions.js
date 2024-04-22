import { useContext } from "react";
import { MsgExecuteContract } from "secretjs";
import { SecretjsContext } from "../secretJs/secretjsContext";

let contractCodeHash =
  "f0cedbbae08ba21f77044254b1daebcafb663dcbe4fe9994ada3c4704963a44c";
let contractAddress = "secret1e335ke9j9ykkc2uc9dgr5ryfp2zq9vjskgaj45";

const SecretjsFunctions = () => {
  const { secretjs, secretAddress } = useContext(SecretjsContext);

  const transfer_token = async (amount, recipientAddress) => {
    // Validation to ensure amount is numeric
    if (isNaN(amount)) {
      console.error("Amount is not a valid number.");
      return;
    }

    // Convert the amount to the smallest unit, ensuring the calculation is done on numbers
    let smallestUnitAmount = (Number(amount) * Math.pow(10, 3)).toString();

    if (smallestUnitAmount === "NaN") {
      console.error("Failed to convert amount to smallest unit.");
      return;
    }

    let handleMsg = {
      transfer: {
        owner: secretAddress,
        amount: smallestUnitAmount, // Use the smallest unit amount
        recipient: recipientAddress,
      },
    };

    try {
      console.log("Transferring tokens");
      let tx = await secretjs.tx.compute.executeContract(
        {
          sender: secretAddress,
          contract_address: contractAddress,
          code_hash: contractCodeHash,
          msg: handleMsg,
        },
        {
          gasLimit: 100_000,
        }
      );
      console.log(tx);
    } catch (error) {
      console.error("Transfer failed:", error);
    }
  };

  return {
    transfer_token,
  };
};

export { SecretjsFunctions };
