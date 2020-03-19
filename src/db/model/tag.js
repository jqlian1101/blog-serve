const seq = require("../seq");

const { STRING } = require("../types");

const Tag = seq.define("tag", {
    name: {
        type: STRING,
        allowNull: false,
        comment: "标签名称"
    }
});

module.exports = Tag;
