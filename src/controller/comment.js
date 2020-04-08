const xss = require("xss");

const { SuccessModel, ErrorModel } = require("../model/ResModel");
const {
    createCommentFailInfo,
    queryParamsFailInfo,
    queryFailInfo,
} = require("../model/ErrorInfo");

const { createComment, getComments } = require("../services/comment");

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
        return new ErrorModel(queryFailInfo);
    }
};

module.exports = {
    comment,
    getCommentsByArticleId,
};
