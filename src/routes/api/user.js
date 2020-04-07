const router = require("koa-router")();

const {
    login,
} = require("../../controller/user");

router.prefix("/user");

/**
 * 登录
 * @params {Object} ctx.body { username, password }
 */
router.post("/login", async (ctx, next) => {
    ctx.body = await login({ ...ctx.request.body });
});

module.exports = router;
