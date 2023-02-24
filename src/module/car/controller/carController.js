/* eslint-disable class-methods-use-this */
const { fromFormToEntity } = require('../mapper/carMapper');
const CarIdNotDefinedError = require('./error/CarIdNotDefinedError');
// Aqui va el error de id.

module.exports = class CarController {
  /**
   * @param {import('../service/carService')} CarService
   */
  constructor(uploadMiddleware, CarService) {
    // super();

    this.uploadMiddleware = uploadMiddleware;
    this.carService = CarService;
    this.ROUTE_BASE = '/car';
    // Ver si necesita una segunda vista para luego. O agregar arriba todo.
  }

  /**
   * @param {import('express').Application} app
   */
  configureRoutes(app) {
    const ROUTE = this.ROUTE_BASE;
    app.get(`${ROUTE}`, this.index.bind(this));
    app.get(`${ROUTE}/manage`, this.manage.bind(this));
    app.get(`${ROUTE}/create`, this.add.bind(this));
    app.get(`${ROUTE}/view/:id`, this.view.bind(this));
    app.get(`${ROUTE}/edit/:id`, this.edit.bind(this));
    app.get(`${ROUTE}/add`, this.add.bind(this));
    app.post(`${ROUTE}/save`, this.uploadMiddleware.single('img'), this.save.bind(this));
    app.get(`${ROUTE}/delete/:id`, this.delete.bind(this));
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async index(req, res) {
    const cars = await this.carService.getAll();
    res.render('car/views/index.njk', {
      cars,
    });
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async manage(req, res) {
    const cars = await this.carService.getAll();
    res.render('car/views/manage.njk', {
      cars,
    });
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async view(req, res) {
    const { id } = req.params;
    if (!id) {
      throw new CarIdNotDefinedError();
    }
    const car = await this.carService.getById(id);
    res.render('car/views/view.njk', {
      car,
    });
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  async edit(req, res) {
    const { id } = req.params;
    if (!id) {
      throw new CarIdNotDefinedError();
    }

    const car = await this.carService.getById(id);
    res.render('car/views/edit.njk', {
      car,
    });
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */

  add(req, res) {
    res.render('car/views/create.njk');
  }

  async save(req, res) {
    const car = fromFormToEntity(req.body);
    if (req.file) {
      const { path } = req.file;
      car.img = path;
    }
    await this.carService.save(car);
    res.redirect('/');
  }

  async delete(req, res) {
    const { id } = req.params;
    const car = await this.carService.getById(id);
    await this.carService.delete(car);
    res.redirect('/car');
  }
};

/*

Form: IGual a add
*/
