const xss = require("xss");

const { SuccessModel, ErrorModel } = require("../model/ResModel");
const {
    createCommentFailInfo,
    queryParamsFailInfo,
    queryFailInfo,
} = require("../model/ErrorInfo");

const { createComment, getComments, getReplies, createCommentReply } = require("../services/comment");

/**
 * 发表comment
 */
const comment = async (params) => {
    const { content } = params;
    try {
        await createComment({ ...params, content: xss(content) });
        return new SuccessModel();
    } catch (e) {
        return new ErrorModel(createCommentFailInfo);
    }
};

/**
 * 通过文章id查询评论
 */
const getCommentsByArticleId = async (params = {}) => {
    const { id } = params;
    if (!id) {
        return new ErrorModel(queryParamsFailInfo);
    }

    try {
        const result = await getComments({ articleId: id });
        return new SuccessModel(result);
    } catch (e) {
        console.log(e);
        return new ErrorModel(queryFailInfo);
    }
};

/**
 * 通过评论id查询回复列表
 */
const getRepliesByCommentId = async (params = {}) => {
    const { id } = params;
    if (!id) {
        return new ErrorModel(queryParamsFailInfo);
    }

    try {
        const result = await getReplies({ commentId: id });
        return new SuccessModel(result);
    } catch (e) {
        console.log(e)
        return new ErrorModel(queryFailInfo);
    }
}

const setCommentReply = async (params = {}) => {
    const { commentId } = params;
    if (!commentId) {
        return new ErrorModel(queryParamsFailInfo);
    }

    try {
        const result = await createCommentReply({ ...params });
        return new SuccessModel();
    } catch (e) {
        console.log(e)
        return new ErrorModel(queryParamsFailInfo);
    }
}

module.exports = {
    comment,
    getCommentsByArticleId,
    getRepliesByCommentId,
    setCommentReply
};
