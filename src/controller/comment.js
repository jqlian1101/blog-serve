const xss = require("xss");

const { SuccessModel, ErrorModel } = require("../model/ResModel");
const {
    createCommentFailInfo,
    queryParamsFailInfo,
    queryFailInfo,
    operateFailInfo
} = require("../model/ErrorInfo");

const { createComment, getComments, queryComments, updateComment, deleteComment } = require("../services/comment");

/**
 * 发表comment
 */
const comment = async (params) => {
    const { content } = params;
    try {
        await createComment({ ...params, content: xss(content) });
        return new SuccessModel();
    } catch (e) {
        console.log(e);
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
 * 查询评论列表
 */
const getCommentAllList = async (params) => {
    const { pageSize = PAGE_SIZE, current = 1, ...otherParams } = params;
    try {
        const data = await queryComments({ pageSize, current, ...otherParams });
        return new SuccessModel({
            ...data,
            pageSize,
            current
        });
    } catch (e) {
        console.log(e);
        return new ErrorModel({
            ...queryFailInfo
        });
    }
}

/**
 * 更新comment数据
 */
const updateCommentInfo = async (params) => {
    const { id, ...otherParams } = params;
    if (!id) {
        return new ErrorModel(queryParamsFailInfo);
    }

    try {
        await updateComment({ ...params });
        return new SuccessModel();
    } catch (e) {
        console.log(e);
        return new ErrorModel({
            ...operateFailInfo
        });
    }
}

const deleteCommentById = async (params) => {
    const { id } = params;
    if (!id) {
        return new ErrorModel(queryParamsFailInfo);
    }

    try {
        await deleteComment({ ...params });
        return new SuccessModel();
    } catch (e) {
        console.log(e);
        return new ErrorModel({
            ...operateFailInfo
        });
    }
}

module.exports = {
    comment,
    getCommentsByArticleId,

    getCommentAllList,
    updateCommentInfo,
    deleteCommentById
};
