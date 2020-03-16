const seq = require("../seq");

const { INTEGER, STRING, TEXT } = require("../types");

const Tag = seq.define("article_tab", {
    name: {
        type: STRING,
        allowNull: false,
        comment: "TagName"
    }
});

module.exports = Tag;
