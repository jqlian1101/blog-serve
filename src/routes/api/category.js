const router = require("koa-router")();

const { getList, create, del } = require("../../controller/category");
const { verifyToken } = require('../../middlewares/jwt');

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
router.post("/create", verifyToken, async (ctx, next) => {
    const { name } = ctx.request.body;
    ctx.body = await create({ name });
});

/**
 * 删除tag
 */
router.post("/del", verifyToken, async (ctx, next) => {
    const { id } = ctx.request.body;
    ctx.body = await del({ id });
});

module.exports = router;
