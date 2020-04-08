const seq = require("../seq");

const { STRING } = require("../types");

const Tag = seq.define(
    "tags",
    {
        name: {
            type: STRING,
            allowNull: false,
            comment: "标签名称",
        },
    },
    {
        freezeTableName: true,
    }
);

module.exports = Tag;
