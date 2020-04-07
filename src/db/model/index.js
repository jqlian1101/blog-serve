const Article = require("./article");
const Category = require("./category");
const Tag = require("./tag");

const User = require("./user");
const Comment = require("./comment");
const CommentReply = require("./commentReply");

const ArticleTagRelation = require("./article_tag");
const ArticleCategoryRelation = require("./article_category");

Article.belongsToMany(Tag, {
    through: {
        model: ArticleTagRelation,
        unique: false,
    },
    foreignKey: "articleId", //通过外键articleId
    constraints: false,
});

Tag.belongsToMany(Article, {
    through: {
        model: ArticleTagRelation,
        unique: false,
    },
    foreignKey: "tagId", //通过外键tagId
    constraints: false,
});

Article.belongsToMany(Category, {
    through: {
        model: ArticleCategoryRelation,
        unique: false,
    },
    foreignKey: "articleId", //通过外键articleId
    constraints: false,
});

Category.belongsToMany(Article, {
    through: {
        model: ArticleCategoryRelation,
        unique: false,
    },
    foreignKey: "categoryId",
    constraints: false,
});

Article.belongsTo(User, {
    foreignKey: "userId",
});

Comment.belongsTo(User, {
    foreignKey: "fromUid",
});

// 关联回复的评论id
CommentReply.belongsTo(Comment, {
    foreignKey: "commentId",
});

// 关联回复者id
CommentReply.belongsTo(User, {
    foreignKey: "fromUid",
});

// 关联评论者id
CommentReply.belongsTo(User, {
    foreignKey: "toUid",
});

module.exports = {
    Article,
    Category,
    Tag,
    ArticleTagRelation,
    ArticleCategoryRelation,
    User,
    Comment,
    CommentReply,
};
