const CarNotFoundError = require('./error/carNotFoundError');
const CarIdNotDefinedError = require('./error/carIdNotDefinedError');

const { fromModelToEntity } = require('../mapper/carMapper');

module.exports = class CarRepository {
  /**
   * @param {import('better-sqlite3').Database} databaseAdapter
   */
  constructor(databaseAdapter) {
    this.databaseAdapter = databaseAdapter;
    // Aqui va si se añade reservacion
  }

  /**
   * @param {import('../entity/Car')} car
   */
 // Error en guardar con edit.
  save(car) {
    let id;
    const isUpdate = car.id;
    if (isUpdate) {
      id = car.id;
      const statement = this.databaseAdapter.prepare(`
        UPDATE cars SET
          ${car.img ? 'img = ?,' : ''}
          brand = ?,
          model = ?,
          year = ?,
          kms = ?,
          colour = ?,
          air = ?,
          passenger = ?,
          transmission = ?,
          price = ?
        WHERE id = ?
      `);
      const params = [
        car.brand,
        car.model,
        car.year,
        car.kms,
        car.colour,
        car.air,
        car.passenger,
        car.transmission,
        car.price,
        car.id,
      ];

      if (car.img) {
        params.unshift(car.img);
      }

      statement.run(params);
    } else {
      const statement = this.databaseAdapter.prepare(`
      INSERT INTO cars (
        brand,
        model,
        year,
        kms,
        colour,
        air,
        passenger,
        img,
        transmission,
        price
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

      const result = statement.run(
        car.brand,
        car.model,
        car.year,
        car.kms,
        car.colour,
        car.air,
        car.passenger,
        car.img,
        car.transmission,
        car.price,
      );

      id = result.lastInsertRowid;
    }

    return this.getById(id);
  }

  /* Segundo. Este de ia
  save(car) {
    let id;
    const isUpdate = car.id;
    if (isUpdate) {
      const existingCar = this.getById(car.id);
      const statement = this.databaseAdapter.prepare(`
        UPDATE cars SET
          img = ?,
          brand = ?,
          model = ?,
          year = ?,
          kms = ?,
          colour = ?,
          air = ?,
          passenger = ?,
          transmission = ?,
          price = ?
        WHERE id = ?
      `);
      const params = [
        car.img || existingCar.img,  // use existing image if none provided
        car.brand,
        car.model,
        car.year,
        car.kms,
        car.colour,
        car.air,
        car.passenger,
        car.transmission,
        car.price,
        car.id,
      ];
      statement.run(params);
      id = car.id;
    } else {
      const statement = this.databaseAdapter.prepare(`
        INSERT INTO cars (
          brand,
          model,
          year,
          kms,
          colour,
          air,
          passenger,
          img,
          transmission,
          price
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      const result = statement.run(
        car.brand,
        car.model,
        car.year,
        car.kms,
        car.colour,
        car.air,
        car.passenger,
        car.img,
        car.transmission,
        car.price,
      );
      id = result.lastInsertRowid;
    }
    return this.getById(id);
  }
  */

  /**
   * @param {import('../entity/Car')} car
   * @returns {Boolean}
   */
  delete(car) {
    if (!car || !car.id) {
      throw new CarIdNotDefinedError('El ID del car no está definido');
    }

    this.databaseAdapter.prepare('DELETE FROM cars WHERE id = ?').run(car.id);

    return true;
  }

  /**
   * @param {Number} id
   * @param {import('../entity/Car')}
   */
  getById(id) {
    const car = this.databaseAdapter
      .prepare(
        `SELECT
              id,
              brand,
              model,
              year,
              kms,
              colour,
              air,
              passenger,
              img,
              transmission,
              price
              FROM cars WHERE id = ?`,
      )
      .get(id);

    if (car === undefined) {
      throw new CarNotFoundError(`No se encontró el car con ID: ${id}`);
    }

    return fromModelToEntity(car);
  }

  getAll() {
    const cars = this.databaseAdapter
      .prepare(
        `SELECT
        id,
        brand,
        model,
        year,
        kms,
        colour,
        air,
        passenger,
        img,
        transmission,
        price
    FROM cars`,
      )
      .all();
    return cars.map((carData) => fromModelToEntity(carData));
  }
};
