const commonInfo = require("./common");
const articleInfo = require("./article");
const userInfo = require("./user");

module.exports = {
    ...commonInfo,
    ...articleInfo,
    ...userInfo
};
