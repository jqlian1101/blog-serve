const seq = require("../seq");

const { INTEGER, STRING, TEXT } = require("../types");

const Category = seq.define(
    "categories",
    {
        name: {
            type: STRING,
            allowNull: false,
            comment: "分类",
        },
    },
    {
        freezeTableName: true,
    }
);

module.exports = Category;
