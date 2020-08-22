/**
 * @description 文章标签关联表
 */

const seq = require("../seq");
const { INTEGER } = require("../types");

const articleTag = seq.define(
    "articleTag",
    {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tagId: {
            type: INTEGER,
            allowNull: false,
            comment: "标签 Id"
        },
        articleId: {
            type: INTEGER,
            allowNull: false,
            comment: "博文 Id"
        }
    },
    {
        freezeTableName: true
    }
);

module.exports = articleTag;
