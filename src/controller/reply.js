const xss = require("xss");

const { SuccessModel, ErrorModel } = require("../model/ResModel");
const {
    createCommentFailInfo,
    queryParamsFailInfo,
    queryFailInfo,
    operateFailInfo
} = require("../model/ErrorInfo");

const { createReply, queryReplies, updateReplies } = require("../services/reply");


/**
 * 通过评论id查询回复列表
 */
const getRepliesByCommentId = async (params = {}) => {
    const { id } = params;
    if (!id) {
        return new ErrorModel(queryParamsFailInfo);
    }

    try {
        const result = await queryReplies({ commentId: id });
        return new SuccessModel(result);
    } catch (e) {
        console.log(e)
        return new ErrorModel(queryFailInfo);
    }
}

const createCommentReply = async (params = {}) => {
    const { commentId } = params;
    if (!commentId) {
        return new ErrorModel(queryParamsFailInfo);
    }

    try {
        const result = await createReply({ ...params });
        return new SuccessModel();
    } catch (e) {
        console.log(e)
        return new ErrorModel(queryParamsFailInfo);
    }
}

/**
 * 查询评论列表
 */
const getReplyAllList = async (params) => {
    const { pageSize = PAGE_SIZE, current = 1, ...otherParams } = params;
    try {
        const data = await queryReplies({ pageSize, current, ...otherParams });
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
 * 更新回复数据
 */
const updateReplyInfo = async (params) => {
    const { id, ...otherParams } = params;
    if (!id) {
        return new ErrorModel(queryParamsFailInfo);
    }

    try {
        await updateReplies({ ...params });
        return new SuccessModel();
    } catch (e) {
        console.log(e);
        return new ErrorModel({
            ...operateFailInfo
        });
    }

}

module.exports = {
    getRepliesByCommentId,
    createCommentReply,
    getReplyAllList,
    updateReplyInfo
};
