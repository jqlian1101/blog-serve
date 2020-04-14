const router = require("koa-router")();

const {
    getCommentAllList,
    updateCommentInfo
} = require("../../controller/comment");

router.prefix("/comment");

/**
 * 获取评论列表
 * isSign: 标记客户端还是管理端，0: 客户端，1001: 管理端
 */
router.post("/list", async (ctx, next) => {
    const { isSign, ...otherParams } = ctx.request.body;
    let result = { ...otherParams }
    if (isSign === '0') {
        result.status = 1;
    }
    ctx.body = await getCommentAllList({ ...result });
});

/**
 * 更新赞的数量
 */
router.post("/:id/like", async (ctx, next) => {
    const { id } = ctx.params;
    ctx.body = await updateCommentInfo({ id, isLike: true })
});


module.exports = router;
