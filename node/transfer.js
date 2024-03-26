import { SecretNetworkClient, Wallet } from "secretjs";
import dotenv from "dotenv";
dotenv.config();

const wallet = new Wallet(process.env.MNEMONIC);
const contractAddress = process.env.CONTRACT_ADDRESS;
const contractCodeHash = process.env.CONTRACT_CODE_HASH;

const secretjs = new SecretNetworkClient({
  chainId: "pulsar-3",
  url: "https://api.pulsar3.scrttestnet.com",
  wallet: wallet,
  walletAddress: wallet.address,
});

const transfer_token = async () => {
  let amount = "500";
  let recipientAddress = "secret12r7r0kgsrvu29tdug6eu6h0aslgajqys2qvdc4";
  let handleMsg = {
    transfer: {
      owner: wallet.address,
      amount: amount, // Make sure to convert this to the proper format if needed
      recipient: recipientAddress,
    },
  };
  // Rest of your function remains the same

  console.log("Transferring tokens");

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
transfer_token();
