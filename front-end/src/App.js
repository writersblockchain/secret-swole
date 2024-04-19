import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { SecretNetworkClient } from 'secretjs';

function App() {
  const [amount, setAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");

  async function connectToKeplr() {
    try {
      const chainId = "secret-3";
      await window.keplr.enable(chainId);
      const keplrOfflineSigner = window.keplr.getOfflineSigner(chainId);
      const accounts = await keplrOfflineSigner.getAccounts();
      setWalletAddress(accounts[0].address);
      alert(`Wallet ${accounts[0].address} is connected!`);
    } catch (error) {
      console.error("Error connecting to Keplr:", error);
      alert("Failed to connect to Keplr.");
    }
  }

  const transferToken = async () => {
    try {
      const chainId = "secret-3";
      const keplrOfflineSigner = window.keplr.getOfflineSigner(chainId);
      const accounts = await keplrOfflineSigner.getAccounts();
      const secretjs = await SecretNetworkClient.create({
        chainId,
        grpcWebUrl: "http://localhost:3000",
        wallet: keplrOfflineSigner,
        walletAddress: accounts[0].address,
        encryptionUtils: window.keplr.getEnigmaUtils(chainId),
      });

      console.log("SecretNetworkClient instantiated successfully!");
      alert("Ready to perform the transfer!");
    } catch (error) {
      console.error("Transfer failed:", error);
      alert("Transfer failed: " + error.message);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {!walletAddress ? (
          <button onClick={connectToKeplr}>Connect to Keplr</button>
        ) : (
          <>
            <p>Connected Wallet Address: {walletAddress}</p>
            <p>Amount to Transfer</p>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount of $SWOLE to send"
            />
            <p>Recipient Wallet Address</p>
            <input
              type="text"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              placeholder="Enter recipient wallet address"
            />
            <button onClick={transferToken}>Transfer</button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
