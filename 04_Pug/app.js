const express = require('express');
const app = express();
const port = 3000;
const host = '127.0.0.1';
// const { mysql, pool } = require('./modules/mysql-conn'); // ES6, get returns and declare at the same time
const { pool, sqlErr } = require('./modules/mysql2-conn'); // ES6, get returns and declare at the same time

app.listen(port, () => { console.log(`http://${host}:${port}`); });

app.set('view engine', 'pug');
app.set('views', './views'); // find files for view engine like render
app.use('/', express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.locals.pretty = true;

app.get(['/board', '/board/:page'], async (req, res) => {
  let page = req.params.page || "list";
  let values = {};

  switch(page) {
    case "list":
      values.title = "List";
      const connect = await pool.getConnection();
      try {
        let query = "SELECT * FROM board ORDER BY id DESC"
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
