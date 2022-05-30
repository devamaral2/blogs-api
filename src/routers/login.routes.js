const routes = require('express').Router();
const { User } = require('../database/models');
require('dotenv').config();

routes.get('/', async (req, res) => {
  const user = await User.findAll();
  console.log(user);
  res.status(200).json(user);
});

module.exports = routes;
