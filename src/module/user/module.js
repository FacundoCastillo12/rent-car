const UserController = require('./controller/userController');
const UserService = require('./service/userService');
const UserRepository = require('./repository/userRepository');

/**
 * @param {import('express').Application} app
 * @param {import('rsdi').IDIContainer} container
 */
function init(app, container) {
  /**
   * @type {UserController} controller;
   */
  const controller = container.get('UserController');
  controller.configureRoutes(app);
}

module.exports = {
  init,
  UserController,
  UserService,
  UserRepository,
};
