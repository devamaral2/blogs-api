const routes = require('express').Router();
const rescue = require('express-rescue');
const UserControllers = require('../controllers/userControllers');
const Validations = require('../middlewares/validations');
const checkJwt = require('../middlewares/checkJwt');
const Schemes = require('../schemas');

routes.post('/', 
  Validations.validateNewUser(Schemes.validateUser), 
  rescue(UserControllers.signUp));
routes.get('/', rescue(checkJwt), UserControllers.getAll);

module.exports = routes;
