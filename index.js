const path = require('path');
const colors = require('colors');

// Directory : app
const main = require('./app/main');

// Set directory wallet profile
const directory = 'wallet';

main(colors, path, directory).catch((error) => {
    console.error(`${colors.white(' > An unexpected error occurred:')}\n${colors.red(error)}`);
});