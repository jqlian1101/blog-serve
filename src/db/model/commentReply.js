const seq = require("../seq");

const { INTEGER, STRING, BOOLEAN } = require("../types");

const CommentReply = seq.define("article", {
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
    replyId:{
        type: INTEGER,
        allowNull: false,
        comment: "回复目标id，replyType为1时，是commentId，replyType为2时为评论用户id",
    },
    content: {
        type: STRING,
        allowNull: false,
        comment: "回复内容",
    },
    toUid:{
        type:INTEGER,
        allowNull:false,
        comment:'评论用户id'
    },
    fromUid:{
        type:INTEGER,
        allowNull:false,
        comment:'回复用户id'
    },
    isAuthor: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: "0为普通回复，1为后台管理员回复",
    },
});

module.exports = CommentReply;
