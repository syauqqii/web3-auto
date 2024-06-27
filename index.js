const main = require('./app/main');
const colors = require('colors');

// Setting private key
const privateKeys = [
    '',
    ''
];

// Settings for network
const rpcUrl = 'https://rpc-testnet.unit0.dev';
const chainID = 88817
const ticker = 'UNIT0'

/* Settings for sending transactions
 *
 * if 'isRandomSending' is true
 *  forget about 'listReceiverAddress'
 * else
 *  fill the 'listReceiverAddress'
 */
const amountToSend = 0.000001;
const transactionCount = 500;
const isRandomSending = false;
const listReceiverAddress = [
    '',
    '',
    '',
    ''
];

// Setting minimum balance for transaction
const minimumBalance = '0.00001';

main(colors, privateKeys, rpcUrl, chainID, ticker, amountToSend, transactionCount, isRandomSending, listReceiverAddress, minimumBalance).catch((error) => {
    console.error(colors.white(' > An unexpected error occurred:'), colors.red(error));
});