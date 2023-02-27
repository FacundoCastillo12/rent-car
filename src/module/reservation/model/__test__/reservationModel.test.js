/* eslint-disable no-undef */
const Sequelize = require('sequelize');
const ReservationModel = require('../reservationModel');

const sequelizeInstance = new Sequelize('sqlite::memory');

describe('Reservation Model', () => {
  test('After doing a setup to a ReservationModel synchronize the model and find Cars table.', async () => {
    ReservationModel.setup(sequelizeInstance);
    await ReservationModel.sync({ force: true });
    expect(await ReservationModel.findAll()).toEqual([]);
  });
});
