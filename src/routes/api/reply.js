const router = require("koa-router")();

const {
    getRepliesAllList,
    updateReplyInfo
} = require("../../controller/reply");

router.prefix("/reply");

/**
 * 获取回复列表
 */
router.post("/list", async (ctx, next) => {
    const { isSign, ...otherParams } = ctx.request.body;
    let result = { ...otherParams }
    if (isSign === '0') {
        result.status = 1;
    }
    ctx.body = await getRepliesAllList({ ...result });
});

/**
 * 更新赞的数量
 */
router.post("/:id/like", async (ctx, next) => {
    const { id } = ctx.params;
    ctx.body = await updateReplyInfo({ id, isLike: true })
});


module.exports = router;
