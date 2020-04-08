const { Comment } = require("../db/model/index");

/**
 * 创建评论
 */
const createComment = async (params) => {
    const { topicId, content } = params;
    const result = await Comment.create({
        topicId,
        content,
    });

    return result.dataValues;
};

/**
 * 通过文章id查询评论列表
 */
const getCommentsByArticleId = async (id) => {
    const result = await Comment.findAndCountAll({
        where: {
            topicId: id,
        },
        attributes: ["content", "likeNum", ["create_date", "createDate"]],
    });

    return {
        result: result.rows.map((item) => item.dataValues),
        count: result.count,
    };
};

/**
 * 查询评论
 */
const getComments = async (params = {}) => {
    const { articleId } = params;
    if (articleId) return await getCommentsByArticleId(articleId);
};

module.exports = {
    createComment,
    getComments,
};
