/**
 * @description sequelize同步模型到mysql数据库
 * @example node src/db/sync.js
 */

const seq = require("./seq");

require("./model");

seq.authenticate()
    .then(() => {
        console.log("sequelize auth ok");
    })
    .catch(() => {
        console.log("sequelize auth error");
    });

seq.sync({ force: true }).then(() => {
    console.log("sync ok");
    process.exit();
});
