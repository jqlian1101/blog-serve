/**
 * @description 文章&分类 关系
 */
const { ArticleCategoryRelation } = require("../db/model/index");
const { isEmpty } = require("../utils/util");

/**
 * 查询 文章&分类 关系
 */
const getArticleCategoryRelation = async ({ articleId, categoryId }) => {
    const whereOpt = {};
    articleId && (whereOpt.articleId = articleId);
    categoryId && (whereOpt.categoryId = categoryId);

    const result = await ArticleCategoryRelation.findOne({ where: { ...whereOpt } });

    if (!result) return {};
    return result.dataValues;
};

/**
 * 创建 文章&分类 关系
 */
const createArticleCategoryRelation = async ({ articleId, categoryId }) => {
    const relation = await getArticleCategoryRelation({
        articleId,
        categoryId
    });

    if (!isEmpty(relation)) return;

    const result = await ArticleCategoryRelation.create({
        articleId,
        categoryId
    });

    return result.dataValues;
};

const deleteArticleCategoryRelation = async ({ categoryId, articleId }) => {
    const result = await ArticleCategoryRelation.destroy({
        where: {
            categoryId,
            articleId
        }
    });

    return result > 0;
};

module.exports = {
    createArticleCategoryRelation,
    deleteArticleCategoryRelation
};
