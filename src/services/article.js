const { Tag, Article, Category } = require("../db/model/index");

/**
 * 创建文章
 */
const createArticles = async data => {
    const result = await Article.create({ ...data });
    return result.dataValues;
};

/**
 * 查询文章列表
 */
const queryArticles = async query => {
    const { id } = query;
    if (id) {
        const result = await Article.findOne({
            where: {
                id
            }
        });

        return result.dataValues;
    }
    const result = await Article.findAndCountAll();
    return result.rows.map(item => item.dataValues);
};

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
    createArticles,
    queryArticles,
    queryArticleTags,
    createArticleTags,

    queryArticleCategory,
    createArticleCategoty
};
