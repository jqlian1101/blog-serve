/**
 * @description 文章评论
 */

const seq = require("../seq");

const { INTEGER, TEXT } = require("../types");

const Comment = seq.define(
    "comments",
    {
        topicId: {
            type: INTEGER,
            allowNull: false,
            comment: "文章id",
        },
        topicTitle: {
            type: TEXT,
            allowNull: false,
            comment: "主题标题",
        },
        content: {
            type: TEXT,
            allowNull: false,
            comment: "内容",
        },
        status: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: "评论状态，0为待审核，1为已发布",
        },
        isTop: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: "是否为置顶评论，1:置顶，0:不置顶",
        },
        likeNum: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: "点赞次数",
        },
        replyNum: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: "被回复次数",
        },
        fromUid: {
            type: INTEGER,
            allowNull: true,
            comment: "评论者id",
        },
    },
    {
        freezeTableName: true,
    }
);

module.exports = Comment;
