/**
 * @description 文章评论回复
 */

const seq = require("../seq");

const { INTEGER, TEXT } = require("../types");

const CommentReply = seq.define(
    "commentReply",
    {
        commentId: {
            type: INTEGER,
            allowNull: false,
            comment: "评论id",
        },
        replyType: {
            type: INTEGER,
            allowNull: false,
            comment: "1为回复评论，2为回复别人的回复",
        },
        replyId: {
            type: INTEGER,
            allowNull: false,
            comment:
                "回复目标id，replyType为1时，是commentId，replyType为2时为评论用户id",
        },
        content: {
            type: TEXT,
            allowNull: false,
            comment: "回复内容",
        },
        // toUid: {
        //     type: INTEGER,
        //     allowNull: true,
        //     comment: "评论用户id",
        // },
        // fromUid: {
        //     type: INTEGER,
        //     allowNull: true,
        //     comment: "回复用户id",
        // },
        isAuthor: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: "0为普通回复，1为后台管理员回复",
        },
        status: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: "评论状态，0为待审核，1为已发布",
        },
        likeNum: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: "点赞次数",
        }
    },
    {
        freezeTableName: true,
    }
);

module.exports = CommentReply;
