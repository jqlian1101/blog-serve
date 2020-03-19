/**
 * @description 文章&分类 关系
 */
const { ArticleTagRelation } = require("../db/model/index");
const { isEmpty } = require("../utils/util");

/**
 * 查询 文章&分类 关系
 */
const getArticleTagRelation = async ({ articleId, tagId }) => {
    const whereOpt = {};
    articleId && (whereOpt.articleId = articleId);
    tagId && (whereOpt.tagId = tagId);
    const result = await ArticleTagRelation.findAll({ ...whereOpt });

    if (!result) return {};
    return result.dataValues;
};

/**
 * 创建 文章&分类 关系
 */
const createArticleTagRelation = async ({ articleId, tagId }) => {
    const relation = getArticleTagRelation({ articleId, tagId });
    if (!isEmpty(relation)) return;

    const result = await ArticleTagRelation.create({
        articleId,
        tagId
    });

    return result.dataValues;
};

module.exports = {
    createArticleTagRelation
};
