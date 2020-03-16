const seq = require("../seq");

const { INTEGER, STRING, TEXT } = require("../types");

const Article = seq.define("article", {
    title: {
        type: STRING,
        allowNull: false,
        comment: "标题"
    },
    summary: {
        type: STRING,
        allowNull: false,
        comment: "概览"
    },
    content: {
        type: TEXT,
        allowNull: false,
        comment: "内容"
    },
    readNumber: {
        type: INTEGER,
        allowNull: false,
        comment: "阅读量"
    }
});

module.exports = Article;
