const { Comment, CommentReply } = require("../db/model/index");

const { isNil } = require('../utils/util')

const QUERY_LIST_ATTRS_COMMENT = [
    "id",
    "topicId",
    "topicTitle",
    "status",
    "isTop",
    "likeNum",
    "replyNum",
    "fromUid",
    "content",
    ["create_date", "createDate"]
    // ['create_daet', "createDate"]
]

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

const getCommentsById = async (id) => {
    const result = await Comment.findByPk(id, {
        attributes: [...QUERY_LIST_ATTRS_COMMENT],
    });

    return result.dataValues;
}

/**
 * 查询评论
 */
const getComments = async (params = {}) => {
    const { articleId, id } = params;
    if (articleId) return await getCommentsByArticleId(articleId);
    if (id) return await getCommentsById(id);
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

/**
 * 查询评论列表
 */
const queryComments = async (query) => {
    const { pageSize, current, status, ...otherParams } = query;

    const searchRule = {};
    !isNil(status) && (searchRule.status = status);

    const result = await Comment.findAndCountAll({
        limit: pageSize,
        offset: pageSize * (current - 1),
        order: [["create_date", "desc"]],
        where: searchRule,
        attributes: [...QUERY_LIST_ATTRS_COMMENT],
        ...otherParams,
    });

    return {
        result: result.rows.map((item) => item.dataValues),
        count: result.count,
    };
}

const updateComment = async (params) => {
    const { id, isLike } = params;

    const updateParams = {};
    const attr = [];

    if (isLike) attr.push('likeNum')

    const oldAttrsKV = await getCommentsById(id);

    attr.map((item) => {
        if (item === 'likeNum') {
            updateParams[item] = isNil(oldAttrsKV[item]) ? 1 : Number(oldAttrsKV[item]) + 1;
        }
    })

    const result = await Comment.update({ ...updateParams }, { where: { id } });
    return result[0] > 0; // 修改的行数
}

module.exports = {
    createComment,
    getComments,
    createCommentReply,
    getReplies,

    queryComments,
    updateComment
};
