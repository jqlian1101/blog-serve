const xss = require("xss");

const { PAGE_SIZE } = require("../common/constant");
const { SuccessModel, ErrorModel } = require("../model/ResModel");
const {
    createArticles,
    queryArticles,
    destoryArticle,
    setArticleStatus
} = require("../services/article");

const { queryArticleTags, createArticleTags } = require("../services/tag");

const {
    queryArticleCategory,
    createArticleCategoty
} = require("../services/category");

const {
    createArticleCategoryRelation,
    deleteArticleCategoryRelation
} = require("../services/articleCategoryRelation");

const {
    createArticleTagRelation,
    deleteArticleTagRelation
} = require("../services/articleTagRelation");

const {
    queryFailInfo,
    createTagFailInfo,
    createArticleFailInfo,
    queryParamsFailInfo,
    deleteArticleFailInfo
} = require("../model/ErrorInfo");

/**
 * 获取文章列表
 */
const getArticleList = async (params = {}) => {
    const { pageSize = PAGE_SIZE, current = 1 } = params;
    try {
        const data = await queryArticles({ pageSize, current });
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
    try {
        const {
            tags,
            categories,
            deleteCategory,
            deleteTag,
            ...otherData
        } = params;

        const newArticle = await createArticles({
            ...otherData,
            content: xss(params.content || ""),
            readNumber: params.readNumber || 0
        });

        const arr = [];
        tags.map(item =>
            arr.push({
                fn: createArticleTagRelation,
                params: {
                    articleId: newArticle.id,
                    tagId: item
                }
            })
        );

        categories.map(item =>
            arr.push({
                fn: createArticleCategoryRelation,
                params: {
                    articleId: newArticle.id,
                    categoryId: item
                }
            })
        );

        for (let i = 0; i < arr.length; i++) {
            await arr[i].fn({ ...arr[i].params });
        }

        await Promise.all([
            ...deleteTag.map(item =>
                deleteArticleTagRelation({
                    articleId: newArticle.id,
                    tagId: item
                })
            ),
            ...deleteCategory.map(item =>
                deleteArticleCategoryRelation({
                    articleId: newArticle.id,
                    categoryId: item
                })
            )
        ]);

        return new SuccessModel();
    } catch (e) {
        console.log(e);
        return new ErrorModel({
            ...createArticleFailInfo
        });
    }
};

const deleteArticle = async ({ id }) => {
    if (!id) {
        return new ErrorModel({
            ...queryParamsFailInfo
        });
    }
    try {
        const result = await destoryArticle(id);
        if (!result) throw Error(`删除${id}文章失败`);
        return new SuccessModel();
    } catch (e) {
        console.log(e);
        return new ErrorModel({
            ...deleteArticleFailInfo
        });
    }
};

/**
 * 修改文章发布状态
 */
const changeArticleStatus = async ({ id, status = 0 }) => {
    if (!id) {
        return new ErrorModel({
            ...queryParamsFailInfo
        });
    }

    try {
        await setArticleStatus({ id, status });
        return new SuccessModel();
    } catch (e) {
        console.log(e);
        return new ErrorModel({
            ...deleteArticleFailInfo
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
    deleteArticle,
    changeArticleStatus,

    getTagList,
    createArticleTag,

    getCategoryList,
    createArticleCategory
};
