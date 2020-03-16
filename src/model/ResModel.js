/**
 * @description response数据模型
 */

/**
 * 基础模型
 * @class BasicModal
 */
class BasicModal {
    constructor({ code, data, message }) {
        this.code = code;
        this.data = data || {};
        this.message = message || "";
    }
}

/**
 * 成功的数据模型
 */
class SuccessModel extends BasicModal {
    constructor(data = {}) {
        super({
            code: 0,
            data
        });
    }
}

/**
 * 失败的数据模型
 */
class ErrorModel extends BasicModal {
    constructor({ errno, message }) {
        super({
            errno,
            message
        });
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
};
