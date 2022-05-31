const routes = require('express').Router();
const rescue = require('express-rescue');
const UserControllers = require('../controllers/userControllers');
const Validations = require('../middlewares/validations');
const Schemes = require('../schemas');

routes.post('/', 
  Validations.validateNewUser(Schemes.validateUser), 
  rescue(UserControllers.signUp));

module.exports = routes;
