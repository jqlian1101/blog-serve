/**
 * @description 文章标签关联表
 */

const seq = require("../seq");
const { INTEGER } = require("../types");

const articleCategory = seq.define(
    "articleCategory",
    {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        categoryId: {
            type: INTEGER,
            allowNull: false,
            comment: "分类 Id"
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

module.exports = articleCategory;
