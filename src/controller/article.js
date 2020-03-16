const { SuccessModel, ErrorModel } = require("../model/ResModel");
const { getTag, createTag } = require("../services/article");
const { queryFailInfo, createTagFailInfo } = require("../model/ErrorInfo");

/**
 * 获取文章列表
 */
const getArticleList = async (params = {}) => {
    return new SuccessModel({
        results: []
    });
};

/**
 * 获取文章标签列表
 */
const getTagList = async (params = {}) => {
    try {
        const data = await getTag();
        return new SuccessModel({
            result: [...data]
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
    try {
        await createTag({ name });
        return new SuccessModel();
    } catch (e) {
        console.log(e);
        return new ErrorModel({
            ...createTagFailInfo
        });
    }
};

module.exports = {
    getArticleList,
    getTagList,
    createArticleTag
};
