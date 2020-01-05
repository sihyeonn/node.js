const express = require('express');
const app = express();
const port = 3000;
const host = '127.0.0.1';

const mysql = require('mysql');
const connect = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'wkdtlgus',
  port: 3306,
  database: 'node',
  connectionLimit: 10
});
/*
// needs to release useless connections
const connect = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3306,
  database: 'node'
});
*/

app.listen(port, () => { console.log(`http://${host}:${port}`); });

app.set('view engine', 'pug');
app.set('views', './views'); // find files for view engine like render
app.use('/', express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.locals.pretty = true;

app.get(['/board', '/board/:page'], (req, res) => {
  let page = req.params.page || "list";
  let values = {};

  switch(page) {
    case "list":
      values.title = "List";
      values.list = [
        {id:1, title: "First one", writer: "Manager", wDate: "2020-01-03", rNum: 5},
        {id:2, title: "Second one", writer: "Manager2", wDate: "2020-01-04", rNum: 6},
        {id:3, title: "Third one", writer: "Manager3", wDate: "2020-01-05", rNum: 4}
      ];
      res.render("list.pug", values); // in views
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

app.get("/sql_test", (req, res) => {
  connect.getConnection((err, connect) => {
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
