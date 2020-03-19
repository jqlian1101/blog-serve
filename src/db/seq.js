/**
 * sequelize
 * @see {@link https://sequelize.org/v5/}
 * @see {@link https://blog.csdn.net/lisemi/article/details/102941626}
 */

const Sequelize = require("sequelize");

const { MYSQL_CFG } = require("../config/db");

const { host, user, password, database } = MYSQL_CFG;

const cfg = {
    host,
    dialect: "mysql",
    pool: {
        max: 5, // 连接池中最大的连接数量
        min: 0, // 最小连接数量
        idle: 10000 // 如果一个连接池 10 s 之内没有被使用，则释放
    },
    timezone: "+08:00", // 改为标准时区
    define: {
        timestamps: true,
        paranoid: true,
        createdAt: "create_date",
        updatedAt: "update_date",
        deletedAt: "delete_date",
        underscored: true
    },
    dialectOptions: {
        dateStrings: true,
        typeCast: true
    }
};

const seq = new Sequelize(database, user, password, cfg);

module.exports = seq;
