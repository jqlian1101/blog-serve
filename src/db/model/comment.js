const seq = require("../seq");

const { INTEGER, STRING } = require("../types");

const Comment = seq.define("article", {
    topicId: {
        type: INTEGER,
        allowNull: false,
        comment: "主题",
    },
    content: {
        type: STRING,
        allowNull: false,
        comment: "内容",
    },
    status: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: "评论状态，0为待审核，1为已发布",
    },
    isTop:{
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
});

module.exports = Comment;
