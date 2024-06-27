const sleep = require('./sleep');

const retry = async (fn, colors, maxRetries=5, delay=5) => {
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fn();
        } catch (error) {
            if (i === maxRetries - 1) throw error;
                console.log(colors.yellow(` > Error occurred. Retrying... (${i + 1}/${maxRetries})`)
            );
            await sleep(delay * 1000);
        }
    }
};

module.exports = retry;