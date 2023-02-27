/* eslint-disable no-undef */

const { Sequelize } = require('sequelize');
const ReservationRepository = require('../reservationRepository');
const ReservationIdNotDefinedError = require('../../error/ReservationIdNotDefinedError');

const ReservationNotFoundError = require('../../error/ReservationNotFoundError');
const UserModel = require('../../../user/model/userModel');
const CarModel = require('../../../car/model/carModel');
const reservationModel = require('../../model/reservationModel');

const createTestUser = require('../../../user/controller/__test__/user.fixture');
const createTestReservation = require('../../controller/__test__/reservation.fixture');
const createTestCar = require('../../../car/controller/__test__/cars.fixture');

describe('Reservation Repository', () => {
  let mockRepository;
  beforeEach(async () => {
    const sequelize = new Sequelize('sqlite::memory');
    const ReservationModel = reservationModel.setup(sequelize);
    const userModel = UserModel.setup(sequelize);
    const carModel = CarModel.setup(sequelize);
    ReservationModel.setupAssociations(carModel, userModel);

    mockRepository = new ReservationRepository(ReservationModel);
    await sequelize.sync({ force: true });
    const testCar = createTestCar(1);
    const testUser = createTestUser(1);
    const carModelTest = CarModel.build(testCar, { isNewRecord: true });
    await carModelTest.save();
    const userModelTest = UserModel.build(testUser, { isNewRecord: true });
    await userModelTest.save();
  });

  describe('Save', () => {
    test('Save a new reservation without ID in database', async () => {
      const reservationWithoutId = createTestReservation();
      const newReservation = await mockRepository.save(reservationWithoutId);

      expect(newReservation.id).toEqual(1);
      expect(newReservation.isPaid).toEqual('Yes');
      expect(newReservation.carId).toEqual(1);
    });
    test('Save a reservation with ID in database = edit', async () => {
      const reservationWithId = createTestReservation(1);
      const newReservation = await mockRepository.save(reservationWithId);
      expect(newReservation.id).toEqual(1);
      expect(newReservation.isPaid).toEqual('Yes');
      expect(newReservation.carId).toEqual(1);
    });
  });

  describe('Delete', () => {
    test('Delete a reservation', async () => {
      const reservationWithoutId = createTestReservation();
      const newReservation = await mockRepository.save(reservationWithoutId);
      const result = await mockRepository.delete(newReservation);
      expect(result).toBe(true);
    });
    test('Delete throw ReservationIdNotDefinedError', async () => {
      const user = { isPaid: 'Yes', carId: 1 };
      await expect(mockRepository.delete(user)).rejects.toThrow(ReservationIdNotDefinedError);
    });
  });

  describe('GetById', () => {
    test('GetById: Get a reservation from database', async () => {
      const reservationWithoutId = createTestReservation();
      await mockRepository.save(reservationWithoutId);

      const {
        id, isPaid, carId,
      } = await mockRepository.getById(1);

      expect(id).toEqual(1);
      expect(isPaid).toEqual('Yes');
      expect(carId).toEqual(1);
    });
    test('GetById: throw CarNotFoundError', async () => {
      const userRepository = new ReservationRepository({
        findOne: jest.fn().mockResolvedValue(undefined),
      });
      await expect(userRepository.getById(1)).rejects.toThrow(ReservationNotFoundError);
    });
  });

  describe('GetAll', () => {
    test('GetAll: Get all reservations from basedate', async () => {
      const firstReservation = createTestReservation();
      const secondResevation = createTestReservation();
      await mockRepository.save(firstReservation);
      await mockRepository.save(secondResevation);
      const reservations = await mockRepository.getAll();
      expect(reservations[0].id).toEqual(1);
      expect(reservations[1].id).toEqual(2);
      expect(reservations[0].dayPrice).toEqual(1000);
      expect(reservations[1].totalPrice).toEqual(5000);
    });
  });
});
