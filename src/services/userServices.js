const jwt = require('jsonwebtoken');
require('dotenv').config();
const error = require('../utils/throwError');
const generateJwt = require('../utils/generateJwt');
const { User } = require('../database/models');

const secret = process.env.JWT_SECRET;

const signUp = async (payload) => {
  const { displayName, email, password, image } = payload;
  console.log(email);
  const users = await User.findAll({ where: { email } });
  if (users.length !== 0) throw error(409, 'User already registered');
  const newUser = await User.create({ email, displayName, password, image });
  const token = generateJwt({ email, id: newUser.dataValues.id });
  return token;
};

const getAll = async () => {
  const users = await User.findAll({ attributes: { exclude: 'password' } });
  return users;
};

const getById = async (id) => {
  const user = await User.findByPk(id, { attributes: { exclude: 'password' } });
  if (!user) throw error(404, 'User does not exist');
  return user;
};

const deleteUser = async (token) => {
  const decoded = jwt.verify(token, secret);
  const { id } = decoded.data;
    await User.destroy({ where: { id } });  
};

module.exports = {
  signUp,
  getAll,
  getById,
  deleteUser,
};
