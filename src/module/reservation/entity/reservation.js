module.exports = class Reservation {
  /**
       * @param {number} id
       * @param {string} startDate
       * @param {string} finishDate
       * @param {number} dayPrice
       * @param {number} totalPrice
       * @param {string} paymentMethod
       * @param {string} isPaid
       * @param {number} carId
       * @param {number} userId
       * @param {string} createdAt
       * @param {string} updatedAt
       */
  constructor(
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
  ) {
    this.id = id;
    this.startDate = startDate;
    this.finishDate = finishDate;
    this.dayPrice = dayPrice;
    this.totalPrice = totalPrice;
    this.paymentMethod = paymentMethod;
    this.isPaid = isPaid;
    this.carId = carId;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  /**
   * @param {import('../../car/entity/Car')} car
   * @param {number} pricePerDay
   */
  fillReservationPrice(car) {
    this.dayPrice = car.price;
    const startDate = new Date(this.startDate);
    const finishDate = new Date(this.finishDate);
    const ONE_DAY_MS = 86400000;
    const reservationDuration = (finishDate.getTime() - startDate.getTime()) / ONE_DAY_MS;
    this.totalPrice = car.price * reservationDuration;
  }

  payReservation() {
    this.isPaid = 'Yes';
  }
};
