const { Comment, CommentReply } = require("../db/model/index");

const { isNil } = require('../utils/util')

const QUERY_LIST_ATTRS_REPLY = [
    "id",
    "commentId",
    "replyType",
    "content",
    "isAuthor",
    "status",
    "likeNum",
    ["create_date", "createDate"]
]

/**
 * 创建回复
 */
const createReply = async (params = {}) => {
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
 * 查询评论下的回复
 */
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

const getRepliesById = async (id) => {
    const result = await CommentReply.findByPk(id, {
        attributes: [...QUERY_LIST_ATTRS_REPLY],
    });

    return result.dataValues;
}


/**
 * 查询评论列表
 */
const queryReplies = async (query) => {
    const { id, commentId, pageSize, current, status, ...otherParams } = query;

    /**
     * 查询评论下的回复
     */
    if (commentId) return await getRepliesByCommentId(commentId);

    /**
     * 通过回复id查询
     */
    if (id) return await getRepliesById(id);

    const searchRule = {};
    !isNil(status) && (searchRule.status = status);

    const result = await CommentReply.findAndCountAll({
        limit: pageSize,
        offset: pageSize * (current - 1),
        order: [["create_date", "desc"]],
        where: searchRule,
        attributes: [...QUERY_LIST_ATTRS_REPLY],
        ...otherParams,
    });

    return {
        result: result.rows.map((item) => item.dataValues),
        count: result.count,
    };
}

const updateReplies = async (params) => {
    const { id, isLike } = params;

    const updateParams = {};
    const attr = [];

    if (isLike) attr.push('likeNum')

    const oldAttrsKV = await getRepliesById(id);

    attr.map((item) => {
        if (item === 'likeNum') {
            updateParams[item] = isNil(oldAttrsKV[item]) ? 1 : Number(oldAttrsKV[item]) + 1;
        }
    })

    const result = await CommentReply.update({ ...updateParams }, { where: { id } });
    return result[0] > 0; // 修改的行数
}

/**
 * 通过id删除回复
 */
const deleteRepliesbyId = async (id) => {
    const result = await CommentReply.destroy({
        where: {
            id,
        }
    });

    return result > 0;
}

/**
 * 删除回复
 */
const deleteReplies = async (params) => {
    if (params.id) return await deleteRepliesbyId(params.id)
}

module.exports = {
    createReply,
    queryReplies,
    updateReplies,
    deleteReplies
};
