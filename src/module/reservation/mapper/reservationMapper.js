const Reservation = require('../entity/reservation');

exports.fromModelToEntity = ({
  id,
  startDate,
  finishDate,
  dayPrice,
  totalPrice,
  paymentMethod,
  isPaid,
  carId,
  userId,
  createdAt,
  updatedAt,
}) => new Reservation(
  Number(id),
  startDate,
  finishDate,
  Number(dayPrice),
  Number(totalPrice),
  paymentMethod,
  isPaid,
  carId,
  userId,
  createdAt,
  updatedAt,
);

exports.fromFormToEntity = ({
  id,
  'start-date': startDate,
  'finish-date': finishDate,
  dayPrice,
  totalPrice,
  'payment-method': paymentMethod,
  paid: isPaid,
  'car-id': carId,
  'user-id': userId,
}) => new Reservation(
  id,
  startDate,
  finishDate,
  Number(dayPrice),
  Number(totalPrice),
  paymentMethod,
  isPaid,
  carId,
  userId,
);
