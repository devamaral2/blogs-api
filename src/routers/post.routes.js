const routes = require('express').Router();
const rescue = require('express-rescue');
const checkJwt = require('../middlewares/checkJwt');
/* const Validation = require('../middlewares/validations');
const Schemes = require('../schemas'); */
const PostControllers = require('../controllers/postControllers');

routes.post('/', 
  rescue(checkJwt), 
  rescue(PostControllers.createPost));
routes.get('/', rescue(checkJwt), PostControllers.getAll);

module.exports = routes;
