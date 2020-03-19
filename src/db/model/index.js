const Article = require("./article");
const Category = require("./category");
const Tag = require("./tag");

const ArticleTagRelation = require("./article_tag");
const ArticleCategoryRelation = require("./article_category");

Article.belongsToMany(Tag, {
    through: {
        model: ArticleTagRelation,
        unique: false
    },
    foreignKey: "articleId", //通过外键articleId
    constraints: false
});

Tag.belongsToMany(Article, {
    through: {
        model: ArticleTagRelation,
        unique: false
    },
    foreignKey: "tagId", //通过外键tagId
    constraints: false
});

Article.belongsToMany(Category, {
    through: {
        model: ArticleCategoryRelation,
        unique: false
    },
    foreignKey: "articleId", //通过外键articleId
    constraints: false
});

Category.belongsToMany(Article, {
    through: {
        model: ArticleCategoryRelation,
        unique: false
    },
    foreignKey: "categoryId",
    constraints: false
});

module.exports = {
    Article,
    Category,
    Tag,
    ArticleTagRelation,
    ArticleCategoryRelation
};
