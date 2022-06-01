const postServices = require('../services/postServices');

const createPost = async (req, res) => {
  const payLoad = req.body; 
  const newPost = await postServices.createPost(payLoad);
  return res.status(201).json(newPost);
};

module.exports = {
  createPost,
};
