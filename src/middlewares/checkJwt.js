const jwt = require('jsonwebtoken');
require('dotenv').config();
const error = require('../utils/throwError');
const { User } = require('../database/models');

const secret = process.env.JWT_SECRET;

module.exports = async (req, _res, next) => {
  const token = req.headers.authorization;
  if (!token) throw error(401, 'Token not found');
  try {
  const decoded = jwt.verify(token, secret);
  await User.findOne({ where: { email: decoded.data.email } });
  return next();
  } catch (err) {
    throw error(401, 'Expired or invalid token');
  }
};