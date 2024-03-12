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

let query_token_info = async () => {
  const tokenInfoQuery = await secretjs.query.compute.queryContract({
    contract_address: contractAddress,
    query: {
      token_info: {},
    },
    code_hash: contractCodeHash,
  });

  console.log(tokenInfoQuery);
};
query_token_info();
