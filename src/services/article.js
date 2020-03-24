const { Article, Tag, Category } = require("../db/model/index");

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
        result: result.rows.map(item => item.dataValues),
        count: result.count
    };
};

const destoryArticle = async id => {
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
    setArticleStatus
};
