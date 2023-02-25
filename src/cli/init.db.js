require('dotenv').config();
const configureDependencyInjection = require('../config/di');

(async () => {
  const container = configureDependencyInjection();
  /**
   * @type {import('sequelize').Sequelize} sequelize
   */
  const sequelize = container.get('Sequelize');
  container.get('CarModel');
  container.get('UserModel');
  container.get('ReservationModel');
  await sequelize.sync();
})();
