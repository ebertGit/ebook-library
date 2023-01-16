const express = require("express");
const path = require("path");
const createError = require("http-errors");

const conf = require("./config");
const indexRouter = require("./routes/index");

let app = express();

// view engine setup
app.set("views", path.join(__dirname, "views")); // 定义页面目录
app.set("view engine", "ejs"); // 定义页面模板引擎（Pug, art, EJS...）https://expressjs.com/en/resources/template-engines.html

app.use(express.json()); // 定义json格式处理数据？middleware for requests where the Content-Type header matches JSON.
app.use(express.urlencoded({extends: false})); // set middleware.
app.use(express.static(path.join(conf.rootPath, "public"))); // 定义静态资源目录

// router setup
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", {error: err});
  // res.send("Error!!\n" + err.message);
});

module.exports = app;