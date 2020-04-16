const xss = require("xss");

const { SuccessModel, ErrorModel } = require("../model/ResModel");
const ERROR_INFO = require("../model/ErrorInfo");

const { getUserInfo, createUser } = require("../services/user");
const { jwtSign } = require('../middlewares/jwt')


const register = async ({ userName, password, nickName }) => {
    const userInfo = await getUserInfo(userName);

    if (userInfo) {
        return new ErrorModel(ERROR_INFO.registerUserNameExistInfo);
    }

    try {
        await createUser({ userName, password, nickName })
        return new SuccessModel();
    } catch (err) {
        console.log(err.message, err.stack)
        return new ErrorModel(ERROR_INFO.registerFailInfo)
    }
}

/**
 * 登录
 * @param {Object} ctx koa2 ctx
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
const login = async (params) => {
    const { userName, password } = params;

    // 获取用户信息
    const userInfo = await getUserInfo(userName, password);
    if (!userInfo) {
        // 登录失败
        return new ErrorModel(ERROR_INFO.loginFailInfo);
    }

    const token = jwtSign(userInfo);
    return new SuccessModel({ token });
};


module.exports = {
    login,
    register
};
