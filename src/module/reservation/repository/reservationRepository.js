const { fromModelToEntity } = require('../mapper/reservationMapper');
const { fromModelToEntity: fromCarModelToEntity } = require('../../car/mapper/carMapper');
const { fromModelToEntity: fromUserModelToEntity } = require('../../user/mapper/userMapper');
const ReservationNotDefinedError = require('../error/ReservationNotDefinedError');
const ReservationIdNotDefinedError = require('../error/ReservationIdNotDefinedError');
const ReservationNotFoundError = require('../error/ReservationNotFoundError');
const CarModel = require('../../car/model/carModel');
const UserModel = require('../../user/model/userModel');
const Reservation = require('../entity/Reservation');

module.exports = class ReservationRepository {
  /**
   * @param {typeof import('../model/reservationModel')} ReservationModel
   */
  constructor(ReservationModel) {
    this.reservationModel = ReservationModel;
    // Aqui va si se añade reservacion o usuario. Ambos
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
