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

const getById = async (req, res) => { 
  const { id } = req.params;
  const post = await postServices.getById(id);
  return res.status(200).json(post);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const payLoad = req.body;
  const token = req.headers.authorization;
  const updatedPost = await postServices.updatePost(payLoad, token, id);
  return res.status(200).json(updatedPost);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  await postServices.deletePost(token, id);
  return res.status(204).end();
};

module.exports = {
  createPost,
  getAll,
  getById,
  updatePost,
  deletePost,
};
