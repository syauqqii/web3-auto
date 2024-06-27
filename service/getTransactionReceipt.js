const getTransactionReceipt = async (provider, txHash) => {
    const receipt = await provider.getTransactionReceipt(txHash);
    return receipt;
};

module.exports = getTransactionReceipt;