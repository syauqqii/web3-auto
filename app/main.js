const { ethers } = require('ethers');

// Directory: helper
const sleep = require('../helper/sleep');
const retry = require('../helper/retry');

// Directory: service
const checkBalance = require('../service/checkBalance');
const getTransactionReceipt = require('../service/getTransactionReceipt');
const sendTransaction = require('../service/sendTransaction');

const main = async (colors, privateKeys, rpcUrl, chainID, ticker='ETH', amountToSend=0.00001, transactionCount=10, gasMin=0.0009, gasMax=0.0015, isRandomSending=true, listReceiverAddress=[''], minimumBalance=0.000001) => {
    const provider = new ethers.JsonRpcProvider(rpcUrl);

    for (const privateKey of privateKeys) {
        const wallet = new ethers.Wallet(privateKey, provider);
        const senderAddress = wallet.address;

        console.log(colors.white(` > Processing transactions for address: ${colors.cyan(senderAddress)}`));

        let senderBalance;
        try {
            senderBalance = await retry(() => checkBalance(provider, senderAddress), colors, 'checkBalance');
        } catch (error) {
            console.log(colors.red(` > Failed to check balance for ${senderAddress}. Skipping to next address.`));
            continue;
        }

        if (senderBalance < ethers.parseUnits(minimumBalance.toString(), 'ether')) {
            console.log(colors.white(` > ${colors.red('Insufficient or zero balance')}. Skipping to next address.`));
            continue;
        }

        let continuePrintingBalance = true;
        const printSenderBalance = async () => {
            while (continuePrintingBalance) {
                try {
                    senderBalance = await retry(() => checkBalance(provider, senderAddress), colors, 'checkBalance');
                    console.log(colors.white(` > Current Balance: ${colors.cyan(ethers.formatUnits(senderBalance,'ether'))} ${ticker}`));
                    if (senderBalance < ethers.parseUnits(minimumBalance.toString(), 'ether')) {
                        console.log(colors.white(` > ${colors.red('Insufficient balance')} for transactions.`));
                        continuePrintingBalance = false;
                    }
                } catch (error) {
                    console.log(colors.while(` > Failed to check balance: ${colors.red(error.shortMessage)}`));
                }
                await sleep(5000);
            }
        };

        printSenderBalance();

        for (let i = 1; i <= transactionCount; i++) {
            let receiverAddress;
            if (isRandomSending) {
                let receiverWallet = ethers.Wallet.createRandom();
                receiverAddress = receiverWallet.address;
                console.log(colors.white(`\n > Generated address ${i}: ${colors.cyan(receiverAddress)}`));
            } else {
                let randomIndex = Math.floor(Math.random() * listReceiverAddress.length);
                receiverAddress = listReceiverAddress[randomIndex];
                console.log(colors.white(`\n > Receiver address : ${colors.cyan(receiverAddress)}`));
            }

            const amountToSendInEther = ethers.parseUnits(amountToSend.toString(),'ether');
            const gasPrice = ethers.parseUnits((Math.random() * (gasMax - gasMin) + gasMin).toFixed(9).toString(), 'gwei');

            const transaction = {
                to: receiverAddress,
                value: amountToSendInEther,
                gasLimit: 21000,
                gasPrice: gasPrice,
                chainId: chainID,
            };

            let tx;
            try {
                tx = await retry(() => sendTransaction(wallet, transaction), colors, 'sendTransaction');
            } catch (error) {
                console.log(colors.white(` > Failed to send transaction: ${colors.red(error.shortMessage)}`));
                i -= 1;
                continue;
            }

            console.log(colors.white(` > Transaction (${i}/${transactionCount})`));
            console.log(colors.white(`   - Hash      : ${colors.green(tx.hash)}`));
            console.log(colors.white(`   - From      : ${colors.green(senderAddress)}`));
            console.log(colors.white(`   - To        : ${colors.green(receiverAddress)}`));
            console.log(colors.white(`   - Amount    : ${colors.green(ethers.formatUnits(amountToSendInEther, 'ether'))} ${ticker}`));
            console.log(colors.white(`   - Gas Price : ${colors.green(ethers.formatUnits(gasPrice, 'gwei'))} Gwei`));

            await sleep(15000);

            let receipt;
            try {
                receipt = await retry(() => getTransactionReceipt(provider, tx.hash), colors, 'getTransactionReceipt');
                if (receipt) {
                    if (receipt.status === 1) {
                        console.log(colors.white(` > Transaction ${colors.green('Success')}`));
                        console.log(colors.white(`   - Block Number : ${colors.green(receipt.blockNumber)}`));
                        console.log(colors.white(`   - Gas Used     : ${colors.green(receipt.gasUsed.toString())}\n`));
                    } else {
                        console.log(colors.white(` > Transaction ${colors.red('Failed')}\n`));
                    }
                } else {
                    console.log(colors.white(` > Transaction ${colors.yellow('Pending')}, after Transaction ${colors.yellow('multiple retries')}.\n`));
                }
            } catch (error) {
                console.log(colors.red(` > Error checking transaction status: ${error.shortMessage}\n`));
                i -= 1;
            }
        }

        console.log(colors.white(` > Finished transactions for address: ${colors.cyan(senderAddress)}\n`));
    }
};

module.exports = main;