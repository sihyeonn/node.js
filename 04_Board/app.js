const express = require('express');
const methodOverride = require('method-override');
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
// Below lines are not necessary for ajax, but they are needed when form requests PUT or DELETE
app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    let method = req.body._method
    delete req.body._method
    return method
  }
}))


/* Router */
const boardRouter = require("./router/board");
const apiRouter = require("./router/api");
app.use("/board", boardRouter);
app.use("/api", apiRouter);
