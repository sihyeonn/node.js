const express = require('express');
const router = express.Router();
const User = require('../schemas/user');
const { alert } = require('../modules/util');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const result = await User.find();
  res.render('index.pug', {result});
});

router.post('/user/save', async (req, res, next) => {
  const { name, age } = req.body;
  const oldUser = await User.findOne({ name })
  console.log(oldUser);
  if (oldUser) res.send(alert('This name is already used.', '/'));
  else {
    const user = new User({ name, age });
    // user.save().then((result) => { res.json(result); }).catch((err) => { next(err) });
    try {
      const result = await user.save();
      res.send(alert('Saved!', '/'));
    } catch(e) { next(e); }
  }
})

router.get('/user/delete/:id', async (req, res, next) => {
  const { id } = req.params;
  const oldUser = await User.findOne({ _id: id });
  if (oldUser) {
    const result = await User.remove({ _id: id });
    if (result.ok === 1) res.send(alert('Removed!', '/'));
    else res.send(alert('Failed to remove!', '/'));
  } else {
    res.send(alert('There is nothing to delete!', '/'));
  }
})

/* update
const result = User.update({ _id: req.params.id }, { age: 99 });
*/

module.exports = router;
