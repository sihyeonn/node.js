const express = require('express');
const app = express();
const port = 3000;
const host = '127.0.0.1';

app.listen(port, () => { console.log(`http://${host}:${port}`); });

app.set('view engine', 'pug');
app.set('views', './views'); // find files for view engine like render
app.use('/', express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.locals.pretty = true;

/* Router */
const boardRouter = require("./router/board");
app.use("/board", boardRouter);

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
