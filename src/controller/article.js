const xss = require("xss");

const { SuccessModel, ErrorModel } = require("../model/ResModel");
const {
    queryArticleTags,
    createArticleTags,
    createArticles,
    queryArticles,

    queryArticleCategory,
    createArticleCategoty
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
            result: data.map(item => ({ id: item.id, name: item.name }))
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
 * 获取文章分类列表
 */
const getCategoryList = async (params = {}) => {
    try {
        const data = await queryArticleCategory();
        return new SuccessModel({
            result: data.map(item => ({ id: item.id, name: item.name }))
        });
    } catch (e) {
        console.log(e);
        return new ErrorModel({
            ...queryFailInfo
        });
    }
};

/**
 * 创建分类
 */
const createArticleCategory = async (params = {}) => {
    const { name } = params;
    if (!name) {
        return new ErrorModel({
            ...queryParamsFailInfo
        });
    }

    try {
        await createArticleCategoty({ name });
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
    createArticleTag,

    getCategoryList,
    createArticleCategory
};
