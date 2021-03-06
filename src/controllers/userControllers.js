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

const getById = async (req, res) => { 
  const { id } = req.params;
  const user = await userServices.getById(id);
  return res.status(200).json(user);
};

const deleteUser = async (req, res) => {
  const token = req.headers.authorization;
  await userServices.deleteUser(token);
  return res.status(204).end();
};

module.exports = {
  signUp,
  getAll,
  getById,
  deleteUser,
};
