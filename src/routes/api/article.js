const router = require("koa-router")();

const {
    getArticleList,
    getArticleDetail,
    createArticle,
    deleteArticle,
    changeArticleStatus,
    getTagList,
    createArticleTag,
    getCategoryList,
    createArticleCategory,
} = require("../../controller/article");

router.prefix("/article");

/**
 * 获取文章列表
 */
router.post("/list", async (ctx, next) => {
    ctx.body = await getArticleList({ ...ctx.request.body });
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
 * 获取tag列表
 */
router.post("/tag-list", async (ctx, next) => {
    ctx.body = await getTagList();
});

/**
 * 创建tag
 */
router.post("/create-tag", async (ctx, next) => {
    const { name } = ctx.request.body;
    ctx.body = await createArticleTag({ name });
});

/**
 * 获取category列表
 */
router.post("/category-list", async (ctx, next) => {
    ctx.body = await getCategoryList();
});

/**
 * 创建category
 */
router.post("/create-category", async (ctx, next) => {
    const { name } = ctx.request.body;
    ctx.body = await createArticleCategory({ name });
});

module.exports = router;
