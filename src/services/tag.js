const { Tag } = require("../db/model/index");


/**
 * 获取标签
 */
const queryArticleTags = async () => {
    const result = await Tag.findAndCountAll();
    const data = result.rows.map(item => item.dataValues);
    return data;
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

module.exports = {
    queryArticleTags,
    createArticleTags,
};
