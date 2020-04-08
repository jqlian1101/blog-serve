const { Article, Tag, Category } = require("../db/model/index");
const Sequelize = require("sequelize");

const { isNil } = require("../utils/util");
const { PAGE_SIZE } = require("../common/constant");

const Op = Sequelize.Op;

const QUERY_ARTICLE_LIST_ATTR = [
    "id",
    "title",
    "keyword",
    "status",
    "summary",
    "readNumber",
    "like",
    ["create_date", "createDate"], // 字段重命名
    ["update_date", "updateDate"],
];

/**
 * 创建文章
 */
const createArticles = async (data) => {
    const { id, ...otherData } = data;
    let result;
    if (id) {
        result = await Article.update({ ...otherData }, { where: { id } });
        return { id: result[0] };
    } else {
        result = await Article.create({ ...data });
        return result.dataValues;
    }
};

/**
 * 通过分类查询文章列表
 * @param { Object } { tagId: '' }
 */
const queryArticlesByTags = async (query) => {
    const { pageSize, current } = query;

    const res = await Tag.findByPk(query.tagId, {
        attributes: ["id", "name"],
        include: [
            {
                model: Article,
                attributes: [...QUERY_ARTICLE_LIST_ATTR], //过滤属性
                through: { attributes: [] }, // 排除中间表
                required: false,
                order: [["update_date", "desc"]],
            },
        ],
        limit: pageSize,
        offset: pageSize * (current - 1),
    });

    const result = res.dataValues;

    return {
        tagInfo: { id: result.id, name: result.name },
        result: [...result.articles],
    };
};

/**
 * 查询文章详情
 * @param { Object } { id }
 */
const queryArticlesById = async (query) => {
    const result = await Article.findByPk(query.id, {
        attributes: [...QUERY_ARTICLE_LIST_ATTR, "content"],
        include: [
            {
                model: Tag,
                attributes: ["id", "name"], //过滤属性
                through: { attributes: [] }, // 排除中间表
                required: false,
            },
            {
                model: Category,
                attributes: ["id", "name"], //过滤属性
                through: { attributes: [] }, // 排除中间表
                required: false,
            },
        ],
    });

    return result.dataValues;
};

/**
 * 查询文章列表
 * @param {Object} { pageSize, current: 当前页 }
 */
const queryArticleList = async (query) => {
    const { pageSize, current, title, keyword, status, ...otherParams } = query;

    const searchRule = {};
    title && (searchRule.title = { [Op.like]: `%${title}%` });
    keyword && (searchRule.keyword = { [Op.like]: `%${keyword}%` });
    !isNil(status) && (searchRule.status = status);

    const result = await Article.findAndCountAll({
        limit: pageSize,
        offset: pageSize * (current - 1),
        order: [["update_date", "desc"]],
        where: searchRule,
        attributes: [...QUERY_ARTICLE_LIST_ATTR],
        ...otherParams,
    });

    return {
        result: result.rows.map((item) => item.dataValues),
        count: result.count,
    };
};

/**
 * 查询文章列表
 * 如果文章id存在，则查询文章详情，否则查询列表
 * @param {Object} { id: 文章id，查询详情, pageSize, current: 当前页 }
 */
const queryArticles = async (query) => {
    if (query.tagId) {
        return queryArticlesByTags(query);
    }

    if (query.id) {
        return queryArticlesById(query);
    }

    return queryArticleList(query);
};

const destoryArticle = async (id) => {
    const result = await Article.destroy({ where: { id } });
    return result > 0;
};

const setArticleStatus = async ({ id, status }) => {
    // 执行修改
    const result = await Article.update({ status }, { where: { id } });
    return result[0] > 0; // 修改的行数
};

module.exports = {
    createArticles,
    queryArticles,
    destoryArticle,
    setArticleStatus,
};
