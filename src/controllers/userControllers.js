const userServices = require('../services/userServices');

const signUp = async (req, res) => {
  const payLoad = req.body; 
  const token = await userServices.signUp(payLoad);
  return res.status(201).json({ token });
};

const getAll = async (_req, res) => { 
  const users = await userServices.getAll();
  return res.status(200).json(users);
};

module.exports = {
  signUp,
  getAll,
};
