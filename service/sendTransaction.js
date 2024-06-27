const sendTransaction = async (wallet, transaction) => {
    const tx = wallet.sendTransaction(transaction);
    return tx;
};

module.exports = sendTransaction;