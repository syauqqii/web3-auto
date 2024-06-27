const fs = require('fs');
const readlineSync = require('readline-sync');
const path = require('path');

// Directory: config
const banner = require('../config/banner');

// Directory: helper
const clearScreen = require('../helper/clearScreen');

const getListWallet = (walletDir, colors, path) => {
    const walletFiles = fs.readdirSync(walletDir).filter(file => file.endsWith('.json'));

    clearScreen()
    banner(colors);

    console.log(` > Select File [${colors.cyan(walletDir)}]`);
    walletFiles.forEach((file, index) => {
        console.log(`   ${colors.cyan(index + 1)}. ${file}`);
    });

    const choice = readlineSync.question(`\n > Input ${colors.cyan('number')} choice: `);
    const selectedFile = walletFiles[parseInt(choice) - 1];

    if (!selectedFile) {
        console.error(colors.white(`\n > Input ${colors.red('not valid')}.`));
        process.exit(1);
    }

    console.log()
    const walletConfig = JSON.parse(fs.readFileSync(path.join(walletDir, selectedFile), 'utf-8'));

    return walletConfig;
};

module.exports = getListWallet;