const $C = require('js-combinatorics');

function combinations(abbr) {
    const combine = new $C.Combination(abbr, 4);
    return combine;
}

module.exports = { combinations };