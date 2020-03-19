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

// force:true,  //   如果表存在 则删除表后重建
// logging:true  // 日志
// alter: true  // 模型新增字段会自动在数据库中添加
seq.sync({ force: false }).then(() => {
    console.log("sync ok");
    process.exit();
});
