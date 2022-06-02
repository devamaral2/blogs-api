const routes = require('express').Router();
const rescue = require('express-rescue');
const checkJwt = require('../middlewares/checkJwt');
const PostControllers = require('../controllers/postControllers');

routes.post('/', rescue(checkJwt), rescue(PostControllers.createPost));
routes.get('/', rescue(checkJwt), PostControllers.getAll);
routes.get('/:id', rescue(checkJwt), rescue(PostControllers.getById));
routes.put('/:id', rescue(checkJwt), rescue(PostControllers.updatePost));
routes.delete('/:id', rescue(checkJwt), rescue(PostControllers.deletePost));

module.exports = routes;
