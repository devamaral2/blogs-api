const userServices = require('../services/userServices');

const signUp = async (req, res) => {
  const payLoad = req.body; 
  const token = await userServices.signUp(payLoad);
  return res.status(201).json({ token });
};

module.exports = {
  signUp,
};
