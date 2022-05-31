const routes = require('express').Router();
const rescue = require('express-rescue');
const checkJwt = require('../middlewares/checkJwt');
const Validation = require('../middlewares/validations');
const Schemes = require('../schemas');
const CategoryControllers = require('../controllers/categoryControllers');

routes.post('/', 
  Validation(Schemes.validateCategory), 
  rescue(checkJwt), 
  rescue(CategoryControllers.createCategory));
routes.get('/', rescue(checkJwt), CategoryControllers.getAll);

module.exports = routes;
