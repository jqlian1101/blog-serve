const { Comment, CommentReply } = require("../db/model/index");

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
        order: [["create_date", "desc"]],
        attributes: ["id", "content", "likeNum", ["create_date", "createDate"]],
        include: [
            {
                model: CommentReply,
                as: 'replies',
                attributes: ["id", "content", "likeNum", ["create_date", "createDate"]],
                order: [["create_date", "desc"]],
            },
        ],
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


const getRepliesByCommentId = async (id) => {
    const result = await CommentReply.findAndCountAll({
        where: {
            commentId: id,
        },
        order: [["create_date", "desc"]],
        attributes: ["id", "content", "likeNum", ["create_date", "createDate"]],
    });

    return {
        result: result.rows.map((item) => item.dataValues),
        count: result.count,
    };
}

/**
 * 查询评论的回复
 */
const getReplies = async (params = {}) => {
    const { commentId } = params;
    if (commentId) return await getRepliesByCommentId(commentId);
}

const createCommentReply = async (params = {}) => {
    const { commentId, content } = params;

    const result = await CommentReply.create({
        commentId,
        content,
        replyType: 1,           // 1为回复评论，2为回复别人的回复
        replyId: commentId      // replyType为1时，是commentId，replyType为2时为评论用户id
    });

    return result.dataValues;
}

module.exports = {
    createComment,
    getComments,
    createCommentReply,
    getReplies
};
