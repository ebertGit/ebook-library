/**
 * Return when the time is over.
 * 
 * @param {Number} millisecond 
 * @returns 
 */
function sleep(millisecond) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, millisecond);
    })
}

module.exports = {
    sleep: sleep
}