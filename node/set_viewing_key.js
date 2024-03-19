import {
  SecretNetworkClient,
  Wallet,
  fromUtf8,
  MsgExecuteContractResponse,
} from "secretjs";
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

const set_viewing_key = async () => {
  const entropy = "Another really random thing";

  let handleMsg = { create_viewing_key: { entropy: entropy } };
  console.log("Creating viewing key");
  let tx = await secretjs.tx.compute.executeContract(
    {
      sender: wallet.address,
      contract_address: contractAddress,
      code_hash: contractCodeHash, // optional but way faster
      msg: handleMsg,
      sent_funds: [], // optional
    },
    {
      gasLimit: 100_000,
    }
  );
  const apiKey = JSON.parse(
    fromUtf8(MsgExecuteContractResponse.decode(tx.data[0]).data)
  ).create_viewing_key.key;
  console.log(apiKey);
};
set_viewing_key();
