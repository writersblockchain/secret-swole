import React, { useState } from "react"; // Import useState for handling input fields
import logo from "./logo.svg";
import "./App.css";
import { SecretNetworkClient, Wallet } from "secretjs";

function App() {
  const [amount, setAmount] = useState(""); // State for storing the amount
  const [walletAddress, setWalletAddress] = useState(""); // State for storing the wallet address

  // Convert the input amount to the proper format before sending
  const convertAmountToSmallestUnit = (amount) => {
    // Assuming the token has 3 decimals as previously discussed
    return (amount * Math.pow(10, 3)).toString();
  };

  const transfer_token = async () => {
    const smallestUnitAmount = convertAmountToSmallestUnit(amount);

    // Initialize SecretNetworkClient inside the function to use the most updated state
    const wallet = new Wallet(process.env.REACT_APP_MNEMONIC);
    const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
    const contractCodeHash = process.env.REACT_APP_CONTRACT_CODE_HASH;
    
    const secretjs = new SecretNetworkClient({
      chainId: "pulsar-3",
      url: "https://api.pulsar3.scrttestnet.com",
      wallet: wallet,
      walletAddress: wallet.address,
    });

    let handleMsg = {
      transfer: {
        owner: wallet.address,
        amount: smallestUnitAmount, // Use converted amount
        recipient: walletAddress,
      },
    };

    console.log("Transferring tokens");
    try {
      let tx = await secretjs.tx.compute.executeContract({
        sender: wallet.address,
        contract_address: contractAddress,
        code_hash: contractCodeHash,
        msg: handleMsg,
      }, {
        gasLimit: 100_000,
      });
      console.log(tx);
      alert("Transfer successful!");
    } catch (error) {
      console.error("Transfer failed:", error);
      alert("Transfer failed: " + error.message);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Amount to Transfer</p>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="amount of $SWOLE to send?"
        />
        <p>Wallet Address</p>
        <input
          type="text"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          placeholder="wallet address to send $SWOLE to?"
        />
        <button onClick={transfer_token}>Transfer</button>
      </header>
    </div>
  );
}

export default App;
