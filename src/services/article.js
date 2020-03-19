const { Tag, Article, Category } = require("../db/model/index");

const { objKeyToHump } = require("./_util");

/**
 * 创建文章
 */
const createArticles = async data => {
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
 * 查询文章列表
 * 如果文章id存在，则查询文章详情，否则查询列表
 * @param {Object} { id: 文章id，查询详情, pageSize, current: 当前页 }
 */
const queryArticles = async query => {
    const { id, pageSize, current } = query;
    if (id) {
        const result = await Article.findByPk(id, {
            attributes: [
                "id",
                "title",
                "keyword",
                "status",
                "summary",
                "readNumber",
                "content",
                ["create_date", "createDate"], // 字段重命名
                ["update_date", "updateDate"]
            ],
            include: [
                {
                    model: Tag,
                    attributes: ["id", "name"], //过滤属性
                    through: { attributes: [] }, // 排除中间表
                    required: false
                },
                {
                    model: Category,
                    attributes: ["id", "name"], //过滤属性
                    through: { attributes: [] }, // 排除中间表
                    required: false
                }
            ]
        });

        return result.dataValues;
    }

    const result = await Article.findAndCountAll({
        limit: pageSize,
        offset: pageSize * (current - 1),
        order: [["update_date", "desc"]],
        attributes: [
            "id",
            "title",
            "keyword",
            "status",
            "summary",
            "readNumber",
            ["create_date", "createDate"],
            ["update_date", "updateDate"]
        ]
    });

    return {
        result: result.rows
            .map(item => item.dataValues)
            .map(item => objKeyToHump(item)),
        count: result.count
    };
};

/**
 * 获取标签
 */
const queryArticleTags = async () => {
    const result = await Tag.findAndCountAll();
    const data = result.rows.map(item => item.dataValues);
    return data;
};

/**
 * 创建标签
 */
const createArticleTags = async ({ name }) => {
    const result = await Tag.create({
        name
    });

    return result.dataValues;
};

/**
 * 获取分类列表
 */
const queryArticleCategory = async () => {
    const result = await Category.findAndCountAll();
    const data = result.rows.map(item => item.dataValues);
    return data;
};

/**
 * 创建分类
 */
const createArticleCategoty = async ({ name }) => {
    const result = await Category.create({
        name
    });

    return result.dataValues;
};

module.exports = {
    createArticles,
    queryArticles,

    queryArticleTags,
    createArticleTags,

    queryArticleCategory,
    createArticleCategoty
};
