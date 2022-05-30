const routes = require('express').Router();
const rescue = require('express-rescue');
const LoginController = require('../controllers/loginControllers');

routes.post('/', rescue(LoginController.signIn));

module.exports = routes;
