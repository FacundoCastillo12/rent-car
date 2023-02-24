/* eslint-disable class-methods-use-this */
const { fromFormToEntity } = require('../mapper/userMapper');
const UserIdNotDefinedError = require('../error/UserIdNotDefinedError');

module.exports = class UserController {
  /**
   * @param {import('../service/userService')} UserService
   */
  constructor(uploadMiddleware, UserService) {
    // super();

    this.uploadMiddleware = uploadMiddleware;
    this.userService = UserService;
    this.ROUTE_BASE = '/user';
  }

  /**
   * @param {import('express').Application} app
   */

  configureRoutes(app) {
    const ROUTE = this.ROUTE_BASE;
    app.get(`${ROUTE}/view/:id`, this.profile.bind(this));
    app.get(`${ROUTE}/edit/:id`, this.edit.bind(this));
    app.get(`${ROUTE}/register`, this.register.bind(this));
    app.get(`${ROUTE}/login`, this.login.bind(this));
    app.post(`${ROUTE}/save`, this.uploadMiddleware.single('photo'), this.save.bind(this));
    app.get(`${ROUTE}/delete/:id`, this.delete.bind(this));
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async profile(req, res) {
    const { id } = req.params;
    if (!id) {
      throw new UserIdNotDefinedError();
    }
    const user = await this.userService.getById(id);
    res.render('user/views/profile.njk', {
      user,
    });
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async edit(req, res) {
    const { id } = req.params;
    if (!id) {
      throw new UserIdNotDefinedError();
    }

    const user = await this.userService.getById(id);
    res.render('user/views/edit.njk', {
      user,
    });
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async register(req, res) {
    res.render('user/views/register.njk');
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async login(req, res) {
    res.render('user/views/login.njk');
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async save(req, res) {
    const user = fromFormToEntity(req.body);
    if (req.file) {
      const { path } = req.file;
      user.img = path;
    }
    await this.userService.save(user);
    res.redirect('/');
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async delete(req, res) {
    const { id } = req.params;
    const user = await this.userService.getById(id);
    await this.userService.delete(user);
    res.redirect('/');
  }
};
