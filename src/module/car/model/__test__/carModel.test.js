/* eslint-disable no-undef */
const Sequelize = require('sequelize');
const CarModel = require('../carModel');

const sequelizeInstance = new Sequelize('sqlite::memory');

describe('Car Model', () => {
  test('After doing a setup to a CarModel synchronize the model and find Cars table.', async () => {
    CarModel.setup(sequelizeInstance);
    await CarModel.sync({ force: true });
    expect(await CarModel.findAll()).toEqual([]);
  });
});
