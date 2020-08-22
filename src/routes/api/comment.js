const router = require("koa-router")();

const {
    getCommentAllList,
    updateCommentInfo,
    deleteCommentById
} = require("../../controller/comment");
const { verifyToken } = require('../../middlewares/jwt');

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

/**
 * 修改评论状态
 */
router.post("/:id/resetStatus", verifyToken, async (ctx, next) => {
    const { id } = ctx.params;
    const { status } = ctx.request.body;
    ctx.body = await updateCommentInfo({ id, status })
});

/**
 * 删除评论
 */
router.post("/del", verifyToken, async (ctx, next) => {
    const content = ctx.request.body;
    ctx.body = await deleteCommentById({ ...content });
});


module.exports = router;
