const CarNotDefinedError = require('./error/CarNotDefinedError');
const CarIdNotDefinedError = require('./error/CarIdNotDefinedError');
const Car = require('../entity/car');

module.exports = class CarService {
  /**
   * @param {import('../repository/carRepository')} CarRepository
   */
  constructor(CarRepository) {
    this.carRepository = CarRepository;
  }

  /**
   * @param {Car} car
   */
  async save(car) {
    if (car === undefined) {
      throw new CarNotDefinedError();
    }

    return this.carRepository.save(car);
  }

  /**
   * @param {Car} car
   */

  async delete(car) {
    if (!(car instanceof Car)) {
      throw new CarNotDefinedError();
    }

    return this.carRepository.delete(car);
  }

  async getById(id) {
    if (id === undefined) {
      throw new CarIdNotDefinedError();
    }

    return this.carRepository.getById(id);
  }

  async getAll() {
    return this.carRepository.getAll();
  }
};
