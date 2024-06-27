function clearScreen() {
    process.stdout.write('\x1Bc');
}

module.exports = clearScreen;