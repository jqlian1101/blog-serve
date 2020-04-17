const router = require("koa-router")();

const {
    getTagList,
    createArticleTag,
    deleteTag
} = require("../../controller/tag");
const { verifyToken } = require('../../middlewares/jwt');

router.prefix("/tag");

/**
 * 获取标签列表
 * @params {Object} ctx.body { pageSize, current, name }  支持通过name模糊搜索
 */
router.post("/list", async (ctx, next) => {
    ctx.body = await getTagList({ ...ctx.request.body });
});

/**
 * 创建tag
 */
router.post("/create", verifyToken, async (ctx, next) => {
    const { name } = ctx.request.body;
    ctx.body = await createArticleTag({ name });
});

/**
 * 删除tag
 */
router.post("/del", verifyToken, async (ctx, next) => {
    const { id } = ctx.request.body;
    ctx.body = await deleteTag({ id });
});

module.exports = router;
