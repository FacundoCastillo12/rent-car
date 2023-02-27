/* eslint-disable no-undef */
const Sequelize = require('sequelize');
const UserModel = require('../userModel');

const sequelizeInstance = new Sequelize('sqlite::memory');

describe('Car Model', () => {
  test('After doing a setup to a UserModel synchronize the model and find Users table.', async () => {
    UserModel.setup(sequelizeInstance);
    await UserModel.sync({ force: true });
    expect(await UserModel.findAll()).toEqual([]);
  });
});
