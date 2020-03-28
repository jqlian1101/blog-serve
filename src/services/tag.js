const Sequelize = require("sequelize");

const { Tag } = require("../db/model/index");

const { isEmpty } = require("../utils/util");

const Op = Sequelize.Op;

/**
 * 获取标签
 */
const queryTags = async (query = {}) => {
    if (isEmpty(query)) {
        const result = await Tag.findAndCountAll();
        const data = result.rows.map(item => item.dataValues);
        return {
            result: data
        };
    }

    const { pageSize, current, name } = query;
    const searchRule = {};
    name && (searchRule.name = { [Op.like]: `%${name}%` });

    const result = await Tag.findAndCountAll({
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
const createArticleTags = async ({ name }) => {
    const result = await Tag.create({
        name
    });

    return result.dataValues;
};

/**
 * 删除
 */
const destoryTag = async id => {
    const result = await Tag.destroy({ where: { id } });
    return result > 0;
};

module.exports = {
    queryTags,
    createArticleTags,
    destoryTag
};
