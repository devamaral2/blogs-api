const jwt = require('jsonwebtoken');
require('dotenv').config();
const { 
  BlogPost, 
  sequelize, 
  PostCategory, 
  Category, 
  User, 
  Sequelize } = require('../database/models');
const error = require('../utils/throwError');

const { Op } = Sequelize; 
const secret = process.env.JWT_SECRET;
const date = new Date(Date.now());

const checkAtributtes = async (title, content, categoryIds) => {
  if (!title || !content || !categoryIds) throw error(400, 'Some required fields are missing');
  const haveAnCategory = await Category.findAndCountAll({ where: { id: categoryIds }, raw: true });
  if (haveAnCategory.rows.length === 0) throw error(400, '"categoryIds" not found'); 
};

const addsPostAndPostCategory = async (title, content, categoryIds, userId) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const newPost = await BlogPost
      .create({ title, content, categoryIds, userId, updated: date, published: date }, 
        { transaction: t });
      await Promise.all(categoryIds.map(async (category) => {
        await PostCategory.create(
          { postId: newPost.dataValues.id, categoryId: category }, 
          { transaction: t },
        );  
      }));
      return newPost.dataValues;
    });
    return result;
  } catch (err) {
     throw error(400, 'occured an error, the db has not been updated');
  }
};

const createPost = async (payLoad, token) => {
  const { title, content, categoryIds } = payLoad;
  const decoded = jwt.verify(token, secret);
  const userId = decoded.data.id;
  await checkAtributtes(title, content, categoryIds);
  return addsPostAndPostCategory(title, content, categoryIds, userId);
};

const getAll = async () => {
  const posts = await BlogPost.findAll({ include: 
    [{ model: User, as: 'user', attributes: { exclude: 'password' } }, 
    { model: Category, as: 'categories', through: { attributes: [] } }] });
  return posts;
};

const getById = async (id) => {
  const post = await BlogPost.findByPk(id, { include: 
    [{ model: User, as: 'user', attributes: { exclude: 'password' } }, 
    { model: Category, as: 'categories', through: { attributes: [] } }] });
  if (!post) throw error(404, 'Post does not exist');
  return post;
};

const updatePost = async (payLoad, token, id) => {
  const { title, content } = payLoad;
  if (!title || !content) throw error(400, 'Some required fields are missing');
  const decoded = jwt.verify(token, secret);
  if (Number(id) !== decoded.data.id) throw error(401, 'Unauthorized user');
  await BlogPost.update({ title, content, userId: id, updated: date }, { where: { id } });
  const post = await BlogPost.findByPk(id, { include: 
    [{ model: User, as: 'user', attributes: { exclude: 'password' } }, 
    { model: Category, as: 'categories', through: { attributes: [] } }] });
  return post;
};

const deletePost = async (token, id) => {
  const decoded = jwt.verify(token, secret);
  const userIdDecoded = decoded.data.id;
  const post = await BlogPost.findByPk(id);
  if (!post) throw error(404, 'Post does not exist');
  const { userId } = post.dataValues;
  console.log(userId)
  console.log(userIdDecoded)
  if (userId !== userIdDecoded) throw error(401, 'Unauthorized user');
  try {
    await sequelize.transaction(async (t) => {
      await BlogPost.destroy({ where: { id, userId } }, { transaction: t });   
    });
  } catch (err) {
     throw error(401, 'Unauthorized user');
  }
};

const searchPost = async (q) => {
  if (!q) {
    const post = await BlogPost.findAll({ include: 
      [{ model: User, as: 'user', attributes: { exclude: 'password' } }, 
      { model: Category, as: 'categories', through: { attributes: [] } }] });
    return post;
  }
  const post = await BlogPost.findAll({ 
    where: {
      [Op.or]: [
        { title: { [Op.like]: q } }, 
        { content: { [Op.like]: q } }, 
      ], 
    }, 
    include: 
      [{ model: User, as: 'user', attributes: { exclude: 'password' } }, 
      { model: Category, as: 'categories', through: { attributes: [] } }], 
  });
  return post;
};

module.exports = {
  createPost,
  getAll,
  getById,
  updatePost,
  deletePost,
  searchPost,
};
