const path = require('path');
const colors = require('colors');

// Directory : app
const main = require('./app/main');

// Directory : helper
const getListWallet = require('./helper/getListWallet');

const { 
    privateKeys, rpcUrl, chainID, ticker, amountToSend, transactionCount, gasMin, gasMax, isRandomSending, listReceiverAddress, minimumBalance 
} = getListWallet(path.join(__dirname, 'wallet'), colors, path);

main(colors, privateKeys, rpcUrl, chainID, ticker, amountToSend, transactionCount, gasMin, gasMax, isRandomSending, listReceiverAddress, minimumBalance.toString()).catch((error) => {
    console.error(`${colors.white(' > An unexpected error occurred:')}\n${colors.red(error)}`);
});