
# WEB3 Automation

Sending automation transaction with ether library.

## Installation + Usage
```bash
git clone https://github.com/syauqqii/web3-auto
```

```bash
cd web3-auto
```

```bash
npm i
```

```bash
cd wallet
```

```bash
add new file with '.json' extension
ex: 'testnet-wallet.json'

use this format:
{
    "privateKeys": [
        "ADD PRIVATE KEY WALLET HERE"
    ],
    "rpcUrl": "PASTE RPC URL HERE",
    "chainID": PASTE CHAIN ID HERE,
    "ticker": "PASTE TICKER HERE",
    "amountToSend": 0.000001,
    "transactionCount": 1000,
    "gasMin": 0.0009,
    "gasMax": 0.0015,
    "isRandomSending": false,
    "listReceiverAddress": [
        "PASTE WALLET ADDRESS HERE",
        "PASTE WALLET ADDRESS HERE",
    ],
    "minimumBalance": 0.00001
}

*NOTE: if isRandomSending is false, then fill listReceiverAddress with ur address or random VALID address
save and back to root folder
```

```bash
cd ..
```

```bash
node index.js
```
