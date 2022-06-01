const postServices = require('../services/postServices');

const createPost = async (req, res) => {
  const payLoad = req.body; 
  const newPost = await postServices.createPost(payLoad);
  return res.status(201).json(newPost);
};

const getAll = async (_req, res) => { 
  const users = await postServices.getAll();
  return res.status(200).json(users);
};

module.exports = {
  createPost,
  getAll,
};
