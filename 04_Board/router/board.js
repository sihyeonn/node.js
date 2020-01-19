const express = require('express');
const path = require('path');
const router = express.Router();
const { pool, sqlErr } = require(aPath('../modules/mysql2-conn')); // ES6, get returns and declare at the same time
const { upload } = require(aPath('../modules/multer-conn'));
const dbName = "board";

/*
  req : /board/update/3
  - router.js
    ~~~js
    const boardRouter = require("./router/board");
    router.use("/board", boardRouter);
    router.get("/update/:id")
    ~~~
*/
router.get(['/', '/:page'], async (req, res) => {
  let page = req.params.page || "list";
  let values = {};

  switch(page) {
    case "list":
      values.title = "List";
      const connect = await pool.getConnection();
      try {
        let query = `SELECT * FROM ${dbName} ORDER BY id DESC`;
        const result = await connect.query(query);
        try {
          for (let v of result[0]) {
            v.fileIcon = v.realFile ? true : false;
          }
          values.list = result[0];
        } catch(err) { sqlErr(err); }
      } catch(err) { sqlErr(err); }
      res.render("list.pug", values); // one router can response only once
      connect.release();
      break;
    case "write":
      values.title = "Write"
      res.render("write.pug", values);
      break;
    default:
      res.redirect("/"); // public/index.html
      break;
  }
});

router.post("/create", upload.single("upFile"), async (req, res) => {
  const connect = await pool.getConnection();
  try {
    let queryStr = `INSERT INTO ${dbName} SET title=?, writer=?, wDate=?, content=?`;
    let queryVal = [req.body.title, req.body.writer, new Date(), req.body.content];
    if (req.file || req.fileUploadChk) {
      queryStr += ', orgFile=?, realFile=?';
      queryVal.push(req.file.originalname, req.file.filename);
    }
    const result = await connect.query(queryStr, queryVal);
    try { res.redirect("/board/list"); }
    catch (err) { sqlErr(err); }
  } catch (err) { sqlErr(err); };
  connect.release();
});

router.get("/view/:id", async (req, res) => {
  const connect = await pool.getConnection();
  try {
    let id = req.params.id;
    let queryStr = `SELECT * FROM ${dbName} WHERE id=${id}`;
    let result = await connect.query(queryStr);
    try {
      let values = {};
      values.title = 'Content';
      values.data = result[0][0];
      if (values.data.realFile) {
        let imgExt = ['.jpg', '.jpeg', '.png', '.gif'];
        let ext = path.extname(values.data.realFile).toLocaleLowerCase();
        values.data.fileTypeChk = (-1 < imgExt.indexOf(ext)) ? 'img' : 'file';
        if (values.data.fileTypeChk === 'img') {
          let subDir = values.data.realFile.split('-')[0];
          values.data.filePath = "/uploads/"+subDir+"/"+values.data.realFile;
        }
      }
      res.render('view.pug', values);
      queryStr = `UPDATE ${dbName} SET rNum = rNum + 1 WHERE id=${id}`;
      result = await connect.query(queryStr);
    } catch (err) { sqlErr(err); }
  } catch (err) { sqlErr(err); };
  connect.release();
});

router.get("/delete/:id", async (req, res) => {
  let id = req.params.id;
  let queryStr = `DELETE FROM ${dbName} WHERE id=${id}`;
  const connect = await pool.getConnection();
  const result = await connect.query(queryStr);
  if (result[0].affectedRows == 1) {
    res.redirect("/board/list");
  } else {
    res.send("Failed to delete");
  }
  connect.release();
});

router.get("/update/:id", async (req, res) => {
  const values = { title: "Modify Content" };
  const id = req.params.id;
  const queryStr = `SELECT * FROM ${dbName} WHERE id=${id}`;
  const connect = await pool.getConnection();
  const result = await connect.query(queryStr);
  values.data = result[0][0];
  res.render("update.pug", values);
  connect.release();
});

router.post("/update", async (req, res) => {
  const queryStr = `UPDATE ${dbName} SET title=?, content=?, wDate=? WHERE id=?`;
  const queryVal = [req.body.title, req.body.content, new Date()];
  queryVal.push(req.body.id);
  const connect = await pool.getConnection();
  const result = await connect.query(queryStr, queryVal);
  if (result[0].serverStatus == 2) {
    res.redirect("/board/list");
  } else {
    res.send("Failed to update")
  }
  connect.release();
});

router.get("/download/:id", async (req, res) => {
  const queryStr = `SELECT orgFile, realFile FROM ${dbName} WHERE id=${req.params.id}`;
  const connect = await pool.getConnection();
  const result = await connect.query(queryStr);
  let filePath = aPath(`../uploads/${result[0][0].realFile.split('-')[0]}`);
  let file = filePath + "/" + result[0][0].realFile;
  res.download(file, result[0][0].orgFile);
  connect.release();
});

function aPath(cPath) {
  return path.join(__dirname, cPath);
}

module.exports = router;
