const jwt = require('jsonwebtoken');
require('dotenv').config();
const error = require('../utils/throwError');
const { User } = require('../database/models');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};
const secret = process.env.JWT_SECRET;

const signIn = async (payload) => {
  const { email, password } = payload;
  if (!email || !password) throw error(400, 'Some required fields are missing');
  const users = await User.findAll({ where: { password, email } });
  if (users.length === 0) throw error(400, 'Invalid fields');
  const token = jwt.sign({ email: users[0].dataValues.email }, secret, jwtConfig);
  return token;
};

module.exports = {
  signIn,
};
