const xss = require("xss");

const { SuccessModel, ErrorModel } = require("../model/ResModel");

const { loginFailInfo } = require("../model/ErrorInfo");

const { getUserInfo } = require("../services/user");

/**
 * 登录
 * @param {Object} ctx koa2 ctx
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
const login = async (ctx, userName, password) => {
    // 获取用户信息
    const userInfo = await getUserInfo(userName, doCrypto(password));
    if (!userInfo) {
        // 登录失败
        return new ErrorModel(loginFailInfo);
    }

    // 登录成功
    if (ctx.session.userInfo == null) {
        ctx.session.userInfo = userInfo;
    }
    return new SuccessModel();
};
module.exports = {
    login
};
