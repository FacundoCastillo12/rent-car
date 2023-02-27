/* eslint-disable no-undef */
const ReservationService = require('../reservationService');
const ReservationIdNotDefinedError = require('../../error/ReservationIdNotDefinedError');
const ReservationNotDefinedError = require('../../error/ReservationNotDefinedError');
const createTestReservation = require('../../controller/__test__/reservation.fixture');
const createTestCar = require('../../../car/controller/__test__/cars.fixture');
const Reservation = require('../../entity/reservation');

const repositoryMock = {
  save: jest.fn(),
  delete: jest.fn(),
  getById: jest.fn(),
  getAll: jest.fn(),
};

const service = new ReservationService(repositoryMock);

describe('ReservationService', () => {
  afterEach(() => {
    Object.values(repositoryMock).forEach((mockFn) => mockFn.mockClear());
  });
  describe('Reservation', () => {
    test('Save a Reservation and call repository save once', async () => {
      const reservation = createTestReservation();
      reservation.dayPrice = undefined;
      reservation.totalPrice = undefined;
      const car = createTestCar(1);

      await service.save(reservation, car);

      expect(repositoryMock.save).toHaveBeenCalledTimes(1);
      expect(repositoryMock.save).toHaveBeenCalledWith(reservation);
      expect(reservation.dayPrice).toEqual('5000');
      expect(reservation.totalPrice).toEqual(20000);
    });
    test('Save throw ReservationNotDefinedError', async () => {
      await expect(service.save).rejects.toThrowError(ReservationNotDefinedError);
    });
  });
  describe('Pay', () => {
    test('Pay: change isPaid to yes and call repository save once', async () => {
      const reservation = createTestReservation();
      reservation.isPaid = 'No';

      await service.pay(reservation);

      expect(repositoryMock.save).toHaveBeenCalledTimes(1);
      expect(repositoryMock.save).toHaveBeenCalledWith(reservation);
      expect(reservation.isPaid).toEqual('Yes');
    });
    test('Play: throw ReservationNotDefinedError', async () => {
      await expect(service.pay).rejects.toThrowError(ReservationNotDefinedError);
    });
  });

  describe('Reservation', () => {
    test('Reservation a reservation and call repository delete once', () => {
      service.delete(new Reservation({ id: 1 }));
      expect(repositoryMock.delete).toHaveBeenCalledTimes(1);
    });
    test('Reservation throw ReservationNotDefinedError', async () => {
      await expect(service.delete).rejects.toThrowError(ReservationNotDefinedError);
    });
  });

  describe('GetById', () => {
    test('Get a reservation and call repository getById once', () => {
      service.getById(1);
      expect(repositoryMock.getById).toHaveBeenCalledTimes(1);
    });
    test('GetById throw ReservationIdNotDefinedError', async () => {
      await expect(service.getById).rejects.toThrowError(ReservationIdNotDefinedError);
    });
  });

  describe('GetAll', () => {
    test('Get all reservation and call repository getAll once', () => {
      service.getAll();
      expect(repositoryMock.getAll).toHaveBeenCalledTimes(1);
    });
  });
});
