import React, { useEffect } from 'react';
import { getKeplrFromWindow } from "@keplr-wallet/stores";
import { SecretNetworkClient } from "secretjs";

const ConnectKeplr = () => {
  useEffect(() => {
    const connectKeplr = async () => {
      try {
        const keplr = await getKeplrFromWindow();
        if (!keplr) {
          alert("Please install Keplr.");
          return;
        }

        // Adjust these values based on the network you are targeting
        const chainId = "pulsar-2"; // Use "pulsar-2" for testnet, adjust for mainnet or other networks as necessary

        await keplr.enable(chainId);
        const offlineSigner = keplr.getOfflineSigner(chainId);
        const accounts = await offlineSigner.getAccounts();

        const secretjs = await SecretNetworkClient.create({
          grpcWebUrl: "https://grpcweb.secretnetwork.io", // Ensure this URL is correct for your target network
          chainId: chainId,
          wallet: offlineSigner,
          walletAddress: accounts[0].address,
          encryptionUtils: keplr.getEnigmaUtils(chainId),
        });

        console.log("Connected to Keplr", secretjs);
      } catch (error) {
        console.error("Error connecting to Keplr:", error);
      }
    };

    connectKeplr();
  }, []);

  return (
    <div>
      <button onClick={connectKeplr}>Connect Keplr Wallet</button>
    </div>
  );
};

export default ConnectKeplr;
