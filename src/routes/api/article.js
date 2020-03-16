const router = require("koa-router")();

const {
    getArticleList,
    getTagList,
    createArticleTag
} = require("../../controller/article");

router.prefix("/article");

router.post("/list", async (ctx, next) => {
    ctx.body = await getArticleList();
});

router.post("/tag-list", async (ctx, next) => {
    ctx.body = await getTagList();
});

router.post("/create/tag", async (ctx, next) => {
    ctx.body = await createArticleTag({ name: "tag1" });
});

module.exports = router;
