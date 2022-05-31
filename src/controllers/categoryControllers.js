const CategoryServices = require('../services/categoryServices');

const createCategory = async (req, res) => {
  const payLoad = req.body; 
  const category = await CategoryServices.createCategory(payLoad);
  return res.status(201).json(category);
};

const getAll = async (_req, res) => { 
  const users = await CategoryServices.getAll();
  return res.status(200).json(users);
};

module.exports = {
  createCategory,
  getAll,
};
