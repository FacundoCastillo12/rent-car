// eslint-disable-next-line import/no-unresolved
const User = require('../../entity/User');

module.exports = function createTestUser(id) {
  return new User(
    id,
    'Emiliano',
    'Rodrigues',
    'DNI',
    '12121212',
    'Argentina',
    'Buenos Aires',
    '0264123456',
    'emiliano@gmail.com',
    '12-01-1998',
    undefined,
    undefined,
  );
};
