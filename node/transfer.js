import { SecretNetworkClient, Wallet } from 'secretjs';
import dotenv from 'dotenv';
dotenv.config();

// Initialize your wallet and SecretNetworkClient
const wallet = new Wallet(process.env.MNEMONIC);
const contractAddress = process.env.CONTRACT_ADDRESS;
const contractCodeHash = process.env.CONTRACT_CODE_HASH;

const secretjs = new SecretNetworkClient({
  chainId: 'pulsar-3',
  url: 'https://api.pulsar3.scrttestnet.com',
  wallet: wallet,
  walletAddress: wallet.address,
});

const transfer_token = async (amount, recipientAddress) => {
  // Validation to ensure amount is numeric
  if (isNaN(amount)) {
    console.error('Amount is not a valid number.');
    return;
  }

  // Convert the amount to the smallest unit, ensuring the calculation is done on numbers
  let smallestUnitAmount = (Number(amount) * Math.pow(10, 3)).toString();

  if (smallestUnitAmount === 'NaN') {
    console.error('Failed to convert amount to smallest unit.');
    return;
  }

  let handleMsg = {
    transfer: {
      owner: wallet.address,
      amount: smallestUnitAmount, // Use the smallest unit amount
      recipient: recipientAddress,
    },
  };

  try {
    console.log('Transferring tokens');
    let tx = await secretjs.tx.compute.executeContract({
      sender: wallet.address,
      contract_address: contractAddress,
      code_hash: contractCodeHash,
      msg: handleMsg,
    }, {
      gasLimit: 100_000,
    });
    console.log(tx);
  } catch (error) {
    console.error('Transfer failed:', error);
  }
};

// Example usage of the transfer_token function
// Replace '1000' with the amount of SWOLE you want to transfer
// and 'recipientAddressHere' with the actual recipient's address
transfer_token(1000, 'secret1sg3psp5fxks3xmd20lluzeyx20q9nwcmgta2v4')
  .then(() => console.log('Transfer successful'))
  .catch((error) => console.error('Transfer failed:', error));
