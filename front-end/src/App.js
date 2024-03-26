import React, { useState } from "react"; // Import useState for handling input fields
import logo from "./logo.svg";
import "./App.css";
import { SecretNetworkClient, Wallet } from "secretjs";

function App() {
  const [amount, setAmount] = useState(""); // State for storing the amount
  const [walletAddress, setWalletAddress] = useState(""); // State for storing the wallet address

  const wallet = new Wallet(process.env.REACT_APP_MNEMONIC);
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
  const contractCodeHash = process.env.REACT_APP_CONTRACT_CODE_HASH;

  const secretjs = new SecretNetworkClient({
    chainId: "pulsar-3",
    url: "https://api.pulsar3.scrttestnet.com",
    wallet: wallet,
    walletAddress: wallet.address,
  });

  const transfer_token = async () => {
    let handleMsg = {
      transfer: {
        owner: wallet.address,
        amount: amount, // Make sure to convert this to the proper format if needed
        recipient: walletAddress,
      },
    };
    // Rest of your function remains the same

    console.log("Transferring tokens");
    console.log(amount);
    console.log(walletAddress);

    let tx = await secretjs.tx.compute.executeContract(
      {
        sender: wallet.address,
        contract_address: contractAddress,
        code_hash: contractCodeHash,
        msg: handleMsg,
      },
      {
        gasLimit: 100_000,
      }
    );
    console.log(tx);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Amount to Transfer</p> {/* Text for the amount input */}
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="amount of $SWOLE to send?"
        />
        <p>Wallet Address</p> {/* Text for the wallet address input */}
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
