const { fromModelToEntity } = require('../mapper/reservationMapper');
const ReservationIdNotDefinedError = require('../error/ReservationIdNotDefinedError');
const ReservationNotFoundError = require('../error/ReservationNotFoundError');

module.exports = class ReservationRepository {
  /**
   * @param {typeof import('../model/reservationModel')} ReservationModel
   */
  constructor(ReservationModel) {
    this.reservationModel = ReservationModel;
  }

  /**
   * @param {import('../entity/Reservation')} reservation
   */
  async save(reservation) {
    let reservationModel;

    const buildOptions = { isNewRecord: !reservation.id };
    reservationModel = this.reservationModel.build(reservation, buildOptions);

    reservationModel = await reservationModel.save();

    return fromModelToEntity(reservationModel);
  }

  /**
   * @param {import('../entity/Reservation')} reservation
   * @returns {Promise<Boolean>}
   */
  async delete(reservation) {
    if (!reservation || !reservation.id) {
      throw new ReservationIdNotDefinedError('The reservation ID is not defined');
    }

    return Boolean(await this.reservationModel.destroy({ where: { id: reservation.id } }));
  }

  /**
   * @param {Number} id
   * @param {Promise<import('../entity/Reservation')>}
   */
  async getById(id) {
    const reservationModel = await this.reservationModel.findOne({
      where: { id },
    });
    if (reservationModel === undefined) {
      throw new ReservationNotFoundError(`Reservation with ID not found: ${id}`);
    }

    return fromModelToEntity(reservationModel);
  }

  /**
   * @param {import('../entity/Reservation')} reservation
   * @returns {Promise<Boolean>}
   */

  async getAll() {
    const reservations = await this.reservationModel.findAll();
    const allReservation = reservations.map((reservation) => fromModelToEntity(reservation));
    return allReservation;
  }
};
