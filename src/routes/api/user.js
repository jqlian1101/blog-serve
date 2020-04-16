const router = require("koa-router")();

const {
    login,
    register
} = require("../../controller/user");

const { verifyToken } = require('../../middlewares/jwt')
router.prefix("/user");

/**
 * 注册
 */
router.post('/register', async (ctx, next) => {
    const { userName, password, nickName } = ctx.request.body;
    ctx.body = await register({ userName, password, nickName })
})

/**
 * 登录
 * @params {Object} ctx.body { username, password }
 */
router.post("/login", async (ctx, next) => {
    ctx.body = await login({ ...ctx.request.body });
});

/**
 * 登录
 * @params {Object} ctx.body { username, password }
 */
router.post("/test", verifyToken, async (ctx, next) => {
    ctx.body = 0;
});

module.exports = router;
