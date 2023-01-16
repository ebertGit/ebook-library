const express = require("express");
const fs = require("fs");
const path = require("path");

const conf = require("../config");

let router = express.Router();
router.get("/", function (req, res, next) {

  // get file name from download folder
  let chapterList = fs.readdirSync(path.join(conf.rootPath, "download"));

  res.render("index", {
    chapterList: chapterList
  });

  //   res.send("Hello, World. --by response.send().");
})

module.exports = router;