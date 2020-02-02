var express = require('express');
const dateTime = require('date-time');
var router = express.Router();
var {Board} = require('../models');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const rows = await Board.findAll({ order: [["id", "desc"]], raw: true });
    rows.forEach(row => row.createdAt = dateTime({date: row.createdAt}));
    res.render('board-list.pug', { rows });
  }
  catch(e) { next(e); }
});

router.get('/get/:id', async function(req, res, next) {
  try {
    const row = await Board.findOne({ where: { id: req.params.id }, raw: true });
    res.json(row);
  }
  catch(e) { next(e); }
});

router.get('/write', async (req, res, next) => {
  res.render('board-write.pug');
});

router.post('/wr', async function(req, res, next) {
  const data = await Board.create({
    title: req.body.title,
    comment: req.body.comment,
    writer: req.body.writer
  });
  res.redirect('/board');
});

router.get('/delete/:id', async (req, res, next) => {
  await Board.destroy({
    where: { id: req.params.id }
  });
  res.redirect('/board');
});

router.put('/update', (req, res, next) => {
  Board.update({
    title: req.body.title,
    comment: req.body.comment,
    writer: req.body.writer
  }, {
    where: { id: req.body.id }
  }).then( res.redirect('/board') );
});

module.exports = router;
