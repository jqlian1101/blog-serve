const seq = require("../seq");

const { INTEGER, STRING, TEXT } = require("../types");

const Category = seq.define("article_category", {
    name: {
        type: STRING,
        allowNull: false,
        comment: "分类"
    },
});

module.exports = Category;
