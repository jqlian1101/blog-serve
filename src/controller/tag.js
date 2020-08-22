const xss = require("xss");

const { PAGE_SIZE } = require("../common/constant");
const { SuccessModel, ErrorModel } = require("../model/ResModel");

const { queryTags, createArticleTags, destoryTag } = require("../services/tag");

const {
    queryFailInfo,
    createTagFailInfo,
    queryParamsFailInfo
} = require("../model/ErrorInfo");

/**
 * 获取文章标签列表
 */
const getTagList = async (params = {}) => {
    try {
        const data = await queryTags(params);
        return new SuccessModel({
            ...data
        });
    } catch (e) {
        console.log(e);
        return new ErrorModel({
            ...queryFailInfo
        });
    }
};

/**
 * 创建标签
 */
const createArticleTag = async (params = {}) => {
    const { name } = params;
    if (!name) {
        return new ErrorModel({
            ...queryParamsFailInfo
        });
    }

    try {
        await createArticleTags({ name });
        return new SuccessModel();
    } catch (e) {
        console.log(e);
        return new ErrorModel({
            ...createTagFailInfo
        });
    }
};

/**
 * 删除标签
 */
const deleteTag = async ({ id }) => {
    if (!id) {
        return new ErrorModel({
            ...queryParamsFailInfo
        });
    }
    try {
        const result = await destoryTag(id);
        if (!result) throw Error(`删除${id}失败`);
        return new SuccessModel();
    } catch (e) {
        console.log(e);
        return new ErrorModel({
            ...deleteArticleFailInfo
        });
    }
};

module.exports = {
    getTagList,
    createArticleTag,
    deleteTag
};
