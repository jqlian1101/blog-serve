const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const cors = require("koa2-cors");

const articleAPI = require("./routes/api/article");
const tagAPI = require("./routes/api/tag");
const categoryAPI = require("./routes/api/category");

// error handler
onerror(app);

// 允许跨域
app.use(cors());

// middlewares
app.use(
    bodyparser({
        enableTypes: ["json", "form", "text"]
    })
);

app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

app.use(
    views(__dirname + "/views", {
        extension: "pug"
    })
);

// logger
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(articleAPI.routes(), articleAPI.allowedMethods());
app.use(tagAPI.routes(), tagAPI.allowedMethods());
app.use(categoryAPI.routes(), categoryAPI.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
    console.error("server error", err, ctx);
});

module.exports = app;
