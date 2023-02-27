const ReservationNotDefinedError = require('../error/ReservationNotDefinedError');
const ReservationIdNotDefinedError = require('../error/ReservationIdNotDefinedError');
const Reservation = require('../entity/reservation');

module.exports = class ReservationService {
  /**
     * @param {import('../repository/reservationRepository')} ReservationRepository
     */
  constructor(ReservationRepository) {
    this.reservationRepository = ReservationRepository;
  }

  /**
   * @param {import('../entity/Reservation')} reservation
   * @param {import('../../car/entity/Car')} car
   */
  async save(reservation, car) {
    if (reservation === undefined) {
      throw new ReservationNotDefinedError();
    }
    reservation.fillReservationPrice(car);
    return this.reservationRepository.save(reservation);
  }

  /**
   * @param {import('../entity/Reservation')} reservation
   */
  async pay(reservation) {
    if (!(reservation instanceof Reservation)) {
      throw new ReservationNotDefinedError();
    }

    reservation.payReservation();
    return this.reservationRepository.save(reservation);
  }

  /**
   * @param {Reservation} reservation
   */

  async delete(reservation) {
    if (!(reservation instanceof Reservation)) {
      throw new ReservationNotDefinedError();
    }

    return this.reservationRepository.delete(reservation);
  }

  async getById(id) {
    if (id === undefined) {
      throw new ReservationIdNotDefinedError();
    }

    return this.reservationRepository.getById(id);
  }

  async getAll() {
    return this.reservationRepository.getAll();
  }
};
