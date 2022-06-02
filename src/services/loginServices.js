const error = require('../utils/throwError');
const generateJwt = require('../utils/generateJwt');
const { User } = require('../database/models');

const signIn = async (payload) => {
  const { email, password } = payload;
  if (!email || !password) throw error(400, 'Some required fields are missing');
  const users = await User.findAll({ where: { password, email } });
  if (users.length === 0) throw error(400, 'Invalid fields');
  const token = generateJwt({ 
    id: users[0].dataValues.id,
    email: users[0].dataValues.email, 
  });
  return token;
};

module.exports = {
  signIn,
};
