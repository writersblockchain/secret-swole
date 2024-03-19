import { SecretNetworkClient, Wallet } from "secretjs";
import dotenv from "dotenv";
dotenv.config();

let contractAddress = process.env.CONTRACT_ADDRESS;
let contractCodeHash = process.env.CONTRACT_CODE_HASH;

const wallet = new Wallet(process.env.MNEMONIC);

const secretjs = new SecretNetworkClient({
  chainId: "pulsar-3",
  url: "https://api.pulsar3.scrttestnet.com",
  wallet: wallet,
  walletAddress: wallet.address,
});

let query_balance = async () => {
  const balanceQuery = {
    balance: {
      key: process.env.VIEWING_KEY,
      address: wallet.address,
    },
  };

  let balance = await secretjs.query.compute.queryContract({
    contract_address: contractAddress,
    code_hash: contractCodeHash,
    query: balanceQuery,
  });

  console.log("My token balance: ", balance);
};
query_balance();
