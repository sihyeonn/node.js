var express = require('express');
var router = express.Router();
var {Board} = require('../models');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const rows = await Board.findAll();
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
