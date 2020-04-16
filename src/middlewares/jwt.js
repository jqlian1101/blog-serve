/**
 * @description jwt验证
 */

const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../config/secretKeys')
const { loginCheckFailInfo, verifyTokenFailInfo } = require('../model/ErrorInfo')
const { ErrorModel } = require("../model/ResModel");

/**
 * 生成token
 * @param {*} data
 * @param {*} options
 */
const jwtSign = (payload = {}, options = {}) => {
    return jwt.sign(payload, JWT_SECRET_KEY, {
        expiresIn: 24 * 60 * 60 * 1000,
        ...options
    })
}

/**
 * 获取token
 * @param {*} ctx
 */
const getToken = (ctx) => {
    const bearerHeader = ctx.headers['authorization'];
    if (typeof bearerHeader === 'undefined') return;

    const bearer = bearerHeader.split(' ');
    return bearer[1];
}

/**
 * token认证
 * @param {*} ctx
 * @param {*} next
 */
const verifyToken = (ctx, next) => {
    const token = getToken(ctx);

    if (!token) {
        ctx.body = new ErrorModel({
            ...loginCheckFailInfo,
        });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        ctx.tokenInfo = decoded;
        next();
    } catch (err) {
        // token认证失败
        ctx.body = new ErrorModel({
            ...verifyTokenFailInfo,
        })
    }
}

module.exports = {
    verifyToken,
    jwtSign
}

