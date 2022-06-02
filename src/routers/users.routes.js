const routes = require('express').Router();
const rescue = require('express-rescue');
const UserControllers = require('../controllers/userControllers');
const Validation = require('../middlewares/validations');
const checkJwt = require('../middlewares/checkJwt');
const Schemes = require('../schemas');

routes.post('/', 
  Validation(Schemes.validateUser), 
  rescue(UserControllers.signUp));
routes.get('/', rescue(checkJwt), UserControllers.getAll);
routes.get('/:id', rescue(checkJwt), rescue(UserControllers.getById));
routes.delete('/me', rescue(checkJwt), rescue(UserControllers.deleteUser));

module.exports = routes;
