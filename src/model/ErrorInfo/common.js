/**
 * @description 失败信息集合，包括 code 和 message
 * @description 公共信息
 */

module.exports = {
    // 数据查询失败
    queryFailInfo: {
        code: 10001,
        message: "数据查询失败"
    },
    // 数据查询失败
    queryParamsFailInfo: {
        code: 10002,
        message: "请求参数错误"
    },
    // 操作失败
    operateFailInfo: {
        code: 10003,
        message: "操作失败，请稍后再试"
    }
};
