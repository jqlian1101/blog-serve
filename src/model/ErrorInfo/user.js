/**
 * @description 失败信息集合，包括 code 和 message
 * @description 用户相关
 */

module.exports = {
    // 用户名已存在
    registerUserNameExistInfo: {
        code: 11001,
        message: "用户名已存在"
    },
    // 注册失败
    registerFailInfo: {
        code: 11002,
        message: "注册失败，请稍后再试"
    },
    // 用户名不存在
    registerUserNameNotExistInfo: {
        code: 11003,
        message: "用户名未存在"
    },
    // 登录失败
    loginFailInfo: {
        code: 11004,
        message: "登录失败，用户名或密码错误"
    },
    // 未登录
    loginCheckFailInfo: {
        code: 11005,
        message: "您尚未登录"
    },
    // 修改密码失败
    changePasswordFailInfo: {
        code: 11006,
        message: "修改密码失败，请稍后再试"
    },
    // 用户认证失败
    verifyTokenFailInfo: {
        code: 11007,
        message: "用户认证失败，请重新登录"
    },
    // 修改基本信息失败
    changeInfoFailInfo: {
        code: 11008,
        message: "修改基本信息失败"
    },
    // json schema 校验失败
    jsonSchemaFileInfo: {
        code: 11009,
        message: "数据格式校验错误"
    },
    // 删除用户失败
    deleteUserFailInfo: {
        code: 11010,
        message: "删除用户失败"
    },
}
