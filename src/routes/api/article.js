const router = require("koa-router")();

const {
    getArticleList,
    getArticleDetail,
    createArticle,
    getTagList,
    createArticleTag
} = require("../../controller/article");

router.prefix("/article");

/**
 * 获取文章列表
 */
router.post("/list", async (ctx, next) => {
    ctx.body = await getArticleList();
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
    ctx.body = await createArticle({ content });
});

/**
 * 获取tag列表
 */
router.post("/tag-list", async (ctx, next) => {
    ctx.body = await getTagList();
});

/**
 * 创建tag
 */
router.post("/create-tag", async (ctx, next) => {
    ctx.body = await createArticleTag({ name: "tag1" });
});

module.exports = router;
