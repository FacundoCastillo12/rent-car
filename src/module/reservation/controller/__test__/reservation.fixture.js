// eslint-disable-next-line import/no-unresolved
const Reservation = require('../../entity/Reservation');

module.exports = function createTestReservation(id) {
  return new Reservation(
    id,
    '2023-03-01',
    '2023-03-05',
    1000, // dayPrice,
    5000, // totalPrice,
    'Cash',
    'Yes',
    1, // carId
    1, // userId
    undefined,
    undefined,
  );
};
