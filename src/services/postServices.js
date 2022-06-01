const { BlogPost, sequelize, PostCategory, Category } = require('../database/models');
const error = require('../utils/throwError');

const date = new Date(Date.now());

const checkAtributtes = async (title, content, categoryIds) => {
  if (!title || !content || !categoryIds) throw error(400, 'Some required fields are missing');
  const haveAnCategory = await Category.findAndCountAll({ where: { id: categoryIds }, raw: true });
  if (haveAnCategory.rows.length === 0) throw error(400, '"categoryIds" not found'); 
};

const addsPostAndPostCategory = async (title, content, categoryIds) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const newPost = await BlogPost
      .create({ title, content, categoryIds, userId: 1, updated: date, published: date }, 
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

const createPost = async (payLoad) => {
  const { title, content, categoryIds } = payLoad;
  await checkAtributtes(title, content, categoryIds);
  return addsPostAndPostCategory(title, content, categoryIds);
};

/* const getAll = async () => {
  const users = await Category.findAll();
  return users;
}; */

module.exports = {
  createPost,
  /* getAll, */
};
