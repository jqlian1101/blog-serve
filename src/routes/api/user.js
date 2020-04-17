const router = require("koa-router")();

const {
    login,
    register
} = require("../../controller/user");

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


module.exports = router;
