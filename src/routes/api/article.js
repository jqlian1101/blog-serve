const router = require("koa-router")();

const {
    getArticleList,
    getArticleDetail,
    createArticle,
    deleteArticle,
    changeArticleStatus,
    updateArticleInfo

    // getTagList,
    // createArticleTag,
    // getCategoryList,
    // createArticleCategory,
} = require("../../controller/article");

const { comment, getCommentsByArticleId, getRepliesByCommentId, setCommentReply } = require("../../controller/comment");

router.prefix("/article");

/**
 * 获取文章列表
 * isSign: 标记客户端还是管理端，0: 客户端，1001: 管理端
 */
router.post("/list", async (ctx, next) => {
    const { isSign, ...otherParams } = ctx.request.body;
    let result = { ...otherParams }
    if (isSign === '0') {
        result.status = 1;
    }
    ctx.body = await getArticleList({ ...result });
});

/**
 * 获取推荐文章
 */
router.post("/recommendations", async (ctx, next) => {
    const { isSign, ...otherParams } = ctx.request.body;
    let result = {
        current: 1,
        pageSize: 5,
        order: [["create_date", "desc"]],
    }
    if (isSign === '0') {
        result.status = 1
    }
    ctx.body = await getArticleList({
        ...result
    });
});

/**
 * 获取文章详情
 */
router.post("/detail", async (ctx, next) => {
    const { body } = ctx.request;
    ctx.body = await getArticleDetail(body);
});

/**
 * 创建文章
 */
router.post("/create", async (ctx, next) => {
    const content = ctx.request.body;
    ctx.body = await createArticle({ ...content });
});

/**
 * 删除文章
 */
router.post("/del", async (ctx, next) => {
    const content = ctx.request.body;
    ctx.body = await deleteArticle({ ...content });
});

/**
 * 修改文章发布状态
 */
router.post("/change-status", async (ctx, next) => {
    const { id, status } = ctx.request.body;
    ctx.body = await changeArticleStatus({ id, status });
});

/**
 * 发表文章评论
 */
router.post("/comment", async (ctx, next) => {
    ctx.body = await comment({ ...ctx.request.body });
});

/**
 * 更新阅读量
 */
router.post("/:articleId/readNum", async (ctx, next) => {
    const { articleId } = ctx.params;
    ctx.body = await updateArticleInfo({ id: articleId, isReadNum: true });
});

/**
 * 更新赞的数量
 */
router.post("/:articleId/like", async (ctx, next) => {
    const { articleId } = ctx.params;
    ctx.body = await updateLi({ id: articleId, isLike: true });
});

/**
 * 获取评论列表
 */
router.post("/:articleId/comments", async (ctx, next) => {
    const { articleId } = ctx.params;
    ctx.body = await getCommentsByArticleId({ id: articleId });
});


/**
 * 获取评论的回复列表
 */
router.post("/:commentId/replies", async (ctx, next) => {
    const { commentId } = ctx.params;
    ctx.body = await getRepliesByCommentId({ id: commentId });
});

/**
 * 获取评论的回复列表
 */
router.post("/:commentId/reply", async (ctx, next) => {
    const { commentId } = ctx.params;
    const query = {
        ...ctx.request.body,
        commentId
    }
    ctx.body = await setCommentReply({ ...query });
});

// /**
//  * 获取tag列表
//  */
// router.post("/tag-list", async (ctx, next) => {
//     ctx.body = await getTagList();
// });

// /**
//  * 创建tag
//  */
// router.post("/create-tag", async (ctx, next) => {
//     const { name } = ctx.request.body;
//     ctx.body = await createArticleTag({ name });
// });

// /**
//  * 获取category列表
//  */
// router.post("/category-list", async (ctx, next) => {
//     ctx.body = await getCategoryList();
// });

// /**
//  * 创建category
//  */
// router.post("/create-category", async (ctx, next) => {
//     const { name } = ctx.request.body;
//     ctx.body = await createArticleCategory({ name });
// });

module.exports = router;
