const express = require('express');
const router = express.Router();

/*
  req : /board/update/3
  - app.js
    ~~~js
    const boardRouter = require("./router/board");
    app.use("/board", boardRouter);
    app.get("/update/:id")
    ~~~
*/
router.get("/sample", (req, res) => {
  res.send("/router/sample");
});

module.exports = router;
