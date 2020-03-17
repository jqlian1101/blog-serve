const xss = require("xss");

const { SuccessModel, ErrorModel } = require("../model/ResModel");
const {
    queryArticleTags,
    createArticleTags,
    createArticles,
    queryArticles
} = require("../services/article");

const {
    queryFailInfo,
    createTagFailInfo,
    createArticleFailInfo,
    queryParamsFailInfo
} = require("../model/ErrorInfo");

/**
 * 获取文章列表
 */
const getArticleList = async (params = {}) => {
    try {
        const result = await queryArticles({});
        return new SuccessModel({
            result
        });
    } catch (e) {
        console.log(e);
        return new ErrorModel({
            ...queryFailInfo
        });
    }
};

/**
 * 查询文章详情
 */
const getArticleDetail = async (params = {}) => {
    const { id } = params;
    if (!id) {
        return new ErrorModel({
            ...queryParamsFailInfo
        });
    }

    try {
        const detail = await queryArticles({ id });
        return new SuccessModel({ detail });
    } catch (e) {
        console.log(e);
        return new ErrorModel({
            ...createArticleFailInfo
        });
    }
};

/**
 * 创建文章
 */
const createArticle = async (params = {}) => {
    const { content = {} } = params;
    try {
        await createArticles({
            ...content,
            content: xss(content.content || ""),
            readNumber: 0
        });
        return new SuccessModel();
    } catch (e) {
        console.log(e);
        return new ErrorModel({
            ...createArticleFailInfo
        });
    }
};

/**
 * 获取文章标签列表
 */
const getTagList = async (params = {}) => {
    try {
        const data = await queryArticleTags();
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
        await createArticleTags({ name });
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
    getArticleDetail,
    createArticle,
    getTagList,
    createArticleTag
};
