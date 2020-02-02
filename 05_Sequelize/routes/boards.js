var express = require('express');
const dateTime = require('date-time');
var router = express.Router();
var {Board} = require('../models');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const rows = await Board.findAll({ order: [["id", "desc"]], raw: true });
  rows.forEach(row => row.createdAt = dateTime({date: row.createdAt}));
  res.render('board-list.pug', { rows });
});

router.get('/write', async (req, res, next) => {
  res.render('board-write.pug');
});

router.post('/wr', async function(req, res, next) {
  const data = await Board.create({
    title: req.body.title,
    comment: req.body.comment,
    writer: req.body.writer,
    rNum: 0
  });
  res.redirect('/board');
});

module.exports = router;
