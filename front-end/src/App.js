import React, { useState, useContext } from "react";
import logo from "./logo.svg";
import "./App.css";
import { SecretjsContext } from "../src/secretJs/secretjsContext";
import { SecretjsFunctions } from "../src/secretJs/SecretjsFunctions";

function App() {
  const [amount, setAmount] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const { transfer_token } = SecretjsFunctions();
  const { connectWallet, walletAddress } = useContext(SecretjsContext);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page
    // Check if the amount is an integer and positive
    if (!amount || !Number.isInteger(Number(amount)) || Number(amount) <= 0) {
      alert("Please enter a valid, positive integer amount.");
      return;
    }
    if (!recipientAddress) {
      alert("Please enter the recipient's wallet address.");
      return;
    }
    try {
      // Convert amount to integer
      const intAmount = parseInt(amount, 10);
      // Assuming transfer_token takes walletAddress, recipientAddress, and amount
      const result = await transfer_token(intAmount, recipientAddress);
      console.log("Transaction successful:", result);
      alert("Transaction successful!");
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Transaction failed: " + error.message);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={connectWallet}>Connect to Keplr</button>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter amount to transfer"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            type="text"
            placeholder="Recipient's Wallet Address"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
          />
          <button type="submit">Transfer Tokens</button>
        </form>
      </header>
    </div>
  );
}

export default App;
