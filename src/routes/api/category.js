const router = require("koa-router")();

const { getList, create, del } = require("../../controller/category");

router.prefix("/category");

/**
 * 获取标签列表
 * @params {Object} ctx.body { pageSize, current, name }  支持通过name模糊搜索
 */
router.post("/list", async (ctx, next) => {
    ctx.body = await getList({ ...ctx.request.body });
});

/**
 * 创建tag
 */
router.post("/create", async (ctx, next) => {
    const { name } = ctx.request.body;
    ctx.body = await create({ name });
});

/**
 * 删除tag
 */
router.post("/del", async (ctx, next) => {
    const { id } = ctx.request.body;
    ctx.body = await del({ id });
});

module.exports = router;
