const express = require('express');
const app = express();
const port = 3000;
const host = '127.0.0.1';
// const { mysql, pool } = require('./modules/mysql-conn'); // ES6, get returns and declare at the same time
const { pool, sqlErr } = require('./modules/mysql2-conn'); // ES6, get returns and declare at the same time
const routerSample = require("./router/board");

app.listen(port, () => { console.log(`http://${host}:${port}`); });

app.set('view engine', 'pug');
app.set('views', './views'); // find files for view engine like render
app.use('/', express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.locals.pretty = true;

app.use("/router", routerSample)

app.get(['/board', '/board/:page'], async (req, res) => {
  let page = req.params.page || "list";
  let values = {};

  switch(page) {
    case "list":
      values.title = "List";
      const connect = await pool.getConnection();
      try {
        let query = "SELECT * FROM board ORDER BY id DESC";
        const result = await connect.query(query);
        try {
          values.list = result[0];
        } catch(err) { sqlErr(err); }
      } catch(err) { sqlErr(err); }
      res.render("list.pug", values); // one router can response only once
      break;
    case "write":
      values.title = "Write"
      res.render("write.pug", values);
      break;
    default:
      res.redirect("/"); // public/index.html
      break;
  }
  connect.release();
});

app.post("/board/write/save", async (req, res) => {
  const connect = await pool.getConnection();
  try {
    let queryStr = "INSERT INTO board SET title=?, writer=?, wDate=?, content=?";
    let queryVal = [req.body.title, req.body.writer, new Date(), req.body.content];
    const result = await connect.query(queryStr, queryVal);
    try { res.redirect("/board/list"); }
    catch (err) { sqlErr(err); }
  } catch (err) { sqlErr(err); };
  connect.release();
});

app.get("/board/view/:id", async (req, res) => {
  const connect = await pool.getConnection();
  try {
    let id = req.params.id;
    let queryStr = `SELECT * FROM board WHERE id=${id}`;
    const result = await connect.query(queryStr);
    try {
      let values = {};
      values.title = 'Content';
      values.data = result[0][0];
      res.render('view.pug', values);
    } catch (err) { sqlErr(err); }
  } catch (err) { sqlErr(err); };
  connect.release();
});

app.get("/board/delete/:id", async (req, res) => {
  let id = req.params.id;
  let queryStr = "DELETE FROM board WHERE id="+id;
  const connect = await pool.getConnection();
  const result = await connect.query(queryStr);
  if (result[0].affectedRows == 1) {
    res.redirect("/board/list");
  } else {
    res.send("Failed to delete");
  }
  connect.release();
});

app.get("/board/update/:id", async (req, res) => {
  const values = { title: "Modify Content" };
  const id = req.params.id;
  const queryStr = `SELECT * FROM board WHERE id=${id}`;
  const connect = await pool.getConnection();
  const result = await connect.query(queryStr);
  values.data = result[0][0];
  res.render("update.pug", values);
  connect.release();
});

app.post("/board/update", async (req, res) => {
  const queryStr = 'UPDATE board SET title=?, content=?, wDate=? WHERE id=?';
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


/* mysql
app.get("/sql_test", (req, res) => {
  pool.getConnection((err, connect) => {
    if (err) {
      res.send("Failed to access DB");
    } else {
      let queryStr = "INSERT INTO board SET title='SQL Test', writer='manager', wDate=now()";
      connect.query(queryStr, (err, result) => {
        if (err) res.send("Failed SQL query");
        else res.json(result);
      });
    }
  });
});
*/
app.get("/sql_test", async (req, res) => {
  const connect = await pool.getConnection(); // promise model
  try {
    let queryStr = "INSERT INTO board SET title=?, writer=?, wDate=now()";
    let queryVal = ["MySQL2 promise test", "manager_2"];
    const result = await connect.query(queryStr, queryVal);
    connect.release();
    try { res.json(result); }
    catch (err) { sqlErr(err); }
  } catch (err) { sqlErr(err); }
  connect.release();
});
