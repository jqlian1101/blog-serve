const { toHump } = require("../utils/util");

const objKeyToHump = (obj = {}) => {
    const result = {};
    for (let i in obj) {
        result[toHump(i)] = obj[i];
    }
    return result;
};

module.exports = {
    objKeyToHump
};
