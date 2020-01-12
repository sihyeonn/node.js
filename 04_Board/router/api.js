const express = require('express');
const router = express.Router(); // return router instance
const { pool, sqlErr } = require('../modules/mysql2-conn');

/*
  HTML only supports get and post method

  REST(Representational State Transfer)
  -- make methods clear
  get:    Read/SELECT
  post:   Create/INSERT
  put:    Update/UPDATE
  delete: Delete/DELETE
*/
router.get(["/get", "/get/:id"], async (req, res) => {
  let sql = '';
  if (req.params.id) sql = `SELECT * FROM board WHERE id=${req.params.id}`;
  else sql = "SELECT * FROM board ORDER BY id DESC";
  const connect = await pool.getConnection();
  const result = await connect.query(sql);
  connect.release();
  res.json(result[0]);
});

//router.post();
//
//router.put();
//
//router.delete();

module.exports = router;
