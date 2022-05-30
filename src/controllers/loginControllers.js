const LoginServices = require('../services/loginServices');

const signIn = async (req, res) => {
  const payLoad = req.body; 
  const token = await LoginServices.signIn(payLoad);
  return res.status(200).json({ token });
};

module.exports = {
  signIn,
};
