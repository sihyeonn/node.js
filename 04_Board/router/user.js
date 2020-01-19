const express = require('express');
const path = require('path');
const User = require(path.join(__dirname, "../models/user"));
const router = express.Router();

router.get('/create', async (req, res) => {
  let result = await User.create({
    username: req.query.username,
    userId: req.query.id,
    age: req.query.age
  });
  res.json(result);
});

router.get("/get", async (req, res) => {
  let result = await User.findAll({
    order: [["id", "desc"], ["age", "asc"]]
  });
  res.json(result);
});

module.exports = router;
