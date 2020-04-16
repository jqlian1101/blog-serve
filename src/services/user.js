const Sequelize = require("sequelize");

const { User } = require("../db/model/index");

/**
 * 获取用户信息
 * @param {String} userName
 * @param {String} password
 */
const getUserInfo = async (userName, password, nickName) => {
    const whereOpt = { userName }

    const result = await User.findOne({
        attributes: ['id', 'userName'],
        where: whereOpt
    })

    // 未找到
    if (result === null) {
        return null
    }

    return result.dataValues;
}


/**
 * 创建用户
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别
 * @param {string} nickName 昵称
 */
const createUser = async ({ userName, password, gender = 3, nickName }) => {
    const result = await User.create({
        userName,
        password,
        nickName: nickName ? nickName : userName,
        gender
    })

    const data = result.dataValues;
    return data;
}

module.exports = {
    getUserInfo,
    createUser
};
