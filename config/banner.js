function banner(colors) {
    console.log(colors.white('\n  _______ _______ _______ _______ '));
    console.log(colors.white(' |\\     /|\\     /|\\     /|\\     /|'));
    console.log(colors.white(' | +---+ | +---+ | +---+ | +---+ |'));
    console.log(colors.white(' | |   | | |   | | |   | | |   | |'));
    console.log(colors.white(` | |${colors.cyan('W')}  | | |${colors.cyan('E')}  | | |${colors.cyan('B')}  | | |${colors.cyan('3')}  | |`));
    console.log(colors.white(' | +---+ | +---+ | +---+ | +---+ |'));
    console.log(colors.white(' |/_____\\|/_____\\|/_____\\|/_____\\|'));
    console.log(colors.white(`\n > Dev: ${colors.cyan('https://github.com/syauqqii/')}\n`));
}

module.exports = banner;
                                 