const seq = require("../seq");

const { INTEGER, STRING, TEXT } = require("../types");

const Article = seq.define(
    "articles",
    {
        userId: {
            type: INTEGER,
            allowNull: true,
            comment: "作者 ID",
        },
        title: {
            type: STRING,
            allowNull: false,
            comment: "标题",
        },
        keyword: {
            type: STRING,
            allowNull: false,
            comment: "关键字",
        },
        status: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: "发布状态，0：草稿，1：已发布",
        },
        summary: {
            type: STRING(1000),
            allowNull: false,
            comment: "概览",
        },
        content: {
            type: TEXT,
            allowNull: false,
            comment: "内容",
        },
        readNumber: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: "阅读量",
        },
        like: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: "赞",
        },
    },
    {
        freezeTableName: true,
    }
);

module.exports = Article;
