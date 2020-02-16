const express = require('express');
const router = express.Router();
const User = require('../schemas/user');
const { alert } = require('../modules/util');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log( User.find() );
  res.render('index.pug');
});

router.post('/user/save', async (req, res, next) => {
  const { name, age } = req.body;
  const oldUser = await User.find({ name })
  console.log(oldUser);
  if (oldUser.length) res.send(alert('This name is already used.', '/'));
  else {
    const user = new User({ name, age });
    // user.save().then((result) => { res.json(result); }).catch((err) => { next(err) });
    try {
      const result = await user.save();
      res.json(result);
    } catch(e) { next(e); }
  }
})

module.exports = router;
