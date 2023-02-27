/* eslint-disable class-methods-use-this */
const { fromFormToEntity } = require('../mapper/userMapper');
const UserIdNotDefinedError = require('../error/UserIdNotDefinedError');

module.exports = class UserController {
  /**
   * @param {import('../service/userService')} UserService
   */
  constructor(UserService) {
    this.userService = UserService;
    this.ROUTE_BASE = '/user';
  }

  /**
   * @param {import('express').Application} app
   */

  configureRoutes(app) {
    const ROUTE = this.ROUTE_BASE;

    app.get(`${ROUTE}/manage`, this.manage.bind(this));
    app.get(`${ROUTE}/view/:id`, this.view.bind(this));
    app.get(`${ROUTE}/edit/:id`, this.edit.bind(this));
    app.get(`${ROUTE}/delete/:id`, this.delete.bind(this));
    app.get(`${ROUTE}/add`, this.create.bind(this));
    app.post(`${ROUTE}/save`, this.save.bind(this));
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async manage(req, res) {
    const users = await this.userService.getAll();
    res.render('user/views/manage.njk', {
      users,
    });
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async view(req, res) {
    const { id } = req.params;
    if (!Number(id)) {
      throw new UserIdNotDefinedError();
    }

    const user = await this.userService.getById(id);
    res.render('user/views/view.njk', {
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
  async create(req, res) {
    res.render('user/views/create.njk');
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async save(req, res) {
    const user = fromFormToEntity(req.body);
    await this.userService.save(user);
    res.redirect('/user/manage');
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async delete(req, res) {
    const { id } = req.params;
    const user = await this.userService.getById(id);
    await this.userService.delete(user);
    res.redirect('/user/manage');
  }
};
