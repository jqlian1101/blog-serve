const Sequelize = require("sequelize");

const { Category } = require("../db/model/index");

const { isEmpty } = require("../utils/util");

const Op = Sequelize.Op;

/**
 * 获取标签
 */
const queryCategory = async (query = {}) => {
    if (isEmpty(query)) {
        const result = await Category.findAndCountAll();
        const data = result.rows.map(item => item.dataValues);
        return data;
    }

    const { pageSize, current, name } = query;
    const searchRule = {};
    name && (searchRule.name = { [Op.like]: `%${name}%` });

    const result = await Category.findAndCountAll({
        limit: pageSize,
        offset: pageSize * (current - 1),
        order: [["create_date", "desc"]],
        where: searchRule,
        attributes: ["id", "name", ["create_date", "createDate"]]
    });

    return {
        result: result.rows.map(item => item.dataValues),
        count: result.count,
        pageSize,
        current
    };
};

/**
 * 创建标签
 */
const createCategory = async ({ name }) => {
    const result = await Category.create({
        name
    });

    return result.dataValues;
};

/**
 * 删除
 */
const destoryCategory = async id => {
    const result = await Category.destroy({ where: { id } });
    return result > 0;
};

module.exports = {
    queryCategory,
    createCategory,
    destoryCategory
};
