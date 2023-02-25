const CarNotFoundError = require('./error/carNotFoundError');
const CarIdNotDefinedError = require('./error/carIdNotDefinedError');

const { fromModelToEntity } = require('../mapper/carMapper');

module.exports = class CarRepository {
  /**
   * @param {typeof import('../model/carModel')} carModel
   */
  constructor(carModel) {
    this.carModel = carModel;
    // Aqui va si se añade reservacion o usuario. Ambos
  }

  /**
   * @param {import('../entity/Car')} car
   */

  async save(car) {
    let carModel;

    const buildOptions = { isNewRecord: !car.id };
    carModel = this.carModel.build(car, buildOptions);

    carModel = await carModel.save();

    return fromModelToEntity(carModel);
  }

  /**
   * @param {import('../entity/Car')} car
   * @returns {Promise<Boolean>}
   */
  async delete(car) {
    if (!car || !car.id) {
      throw new CarIdNotDefinedError('The car ID is not defined');
    }

    return Boolean(await this.carModel.destroy({ where: { id: car.id } }));
  }

  /**
   * @param {Number} id
   * @param {Promise<import('../entity/Car')>}
   */
  async getById(id) {
    const carModel = await this.carModel.findOne({
      where: { id },
    });
    if (carModel === undefined) {
      throw new CarNotFoundError(`Car with ID not found: ${id}`);
    }

    return fromModelToEntity(carModel);
  }
  /**
   * @param {import('../entity/Car')} car
   * @returns {Promise<Boolean>}
   */

  async getAll() {
    const cars = await this.carModel.findAll();
    const carsAll = cars.map((car) => fromModelToEntity(car));
    return carsAll;
  }
};
