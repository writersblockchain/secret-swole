import React, { useState } from 'react'; // Import useState for handling input fields
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [amount, setAmount] = useState(''); // State for storing the amount
  const [walletAddress, setWalletAddress] = useState(''); // State for storing the wallet address

  // Function to handle the transfer action
  const handleTransfer = () => {
    // Ideally, you'll call the transfer function here. For now, it just logs inputs.
    console.log(`Transferring ${amount} $SWOLE to ${walletAddress}`);
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
        <button onClick={handleTransfer}>Transfer</button>
      </header>
    </div>
  );
}

export default App;
