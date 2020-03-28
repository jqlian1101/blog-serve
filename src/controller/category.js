const xss = require("xss");

const { SuccessModel, ErrorModel } = require("../model/ResModel");

const {
    queryCategory,
    createCategory,
    destoryCategory
} = require("../services/category");

const {
    queryFailInfo,
    createTagFailInfo,
    queryParamsFailInfo
} = require("../model/ErrorInfo");

/**
 * 获取文章标签列表
 */
const getList = async (params = {}) => {
    try {
        const data = await queryCategory(params);
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
const create = async (params = {}) => {
    const { name } = params;
    if (!name) {
        return new ErrorModel({
            ...queryParamsFailInfo
        });
    }

    try {
        await createCategory({ name });
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
const del = async ({ id }) => {
    if (!id) {
        return new ErrorModel({
            ...queryParamsFailInfo
        });
    }
    try {
        const result = await destoryCategory(id);
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
    getList,
    create,
    del
};
