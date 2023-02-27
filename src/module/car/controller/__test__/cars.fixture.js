// eslint-disable-next-line import/no-unresolved
const Car = require('../../entity/Car');

module.exports = function createTestCar(id) {
  return new Car(
    id,
    'BWM',
    'Serie 3',
    '2020',
    '25000',
    'Red',
    'Yes',
    '4',
    '/img/1677377494262.jpg',
    'Automatic',
    '5000',
    undefined,
    undefined,
  );
};
