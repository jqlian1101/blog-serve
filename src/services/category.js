const { Category } = require("../db/model/index");


/**
 * 获取分类列表
 */
const queryArticleCategory = async () => {
    const result = await Category.findAndCountAll();
    const data = result.rows.map(item => item.dataValues);
    return data;
};

/**
 * 创建分类
 */
const createArticleCategoty = async ({ name }) => {
    const result = await Category.create({
        name
    });

    return result.dataValues;
};

module.exports = {
    queryArticleCategory,
    createArticleCategoty
};
