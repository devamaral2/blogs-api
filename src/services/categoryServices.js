const { Category } = require('../database/models');

const createCategory = async (payload) => {
  const { name } = payload;
  const category = await Category.create({ name });
  return category.dataValues;
};

const getAll = async () => {
  const users = await Category.findAll();
  return users;
};

module.exports = {
  createCategory,
  getAll,
};
