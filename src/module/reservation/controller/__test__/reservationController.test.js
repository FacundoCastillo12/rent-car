/* eslint-disable no-undef */
const ReservationController = require('../reservationController');
const createTestReservation = require('./reservation.fixture');
const createTestCar = require('../../../car/controller/__test__/cars.fixture');
const createTestUser = require('../../../user/controller/__test__/user.fixture');
const ReservationIdNotDefinedError = require('../../error/ReservationIdNotDefinedError');
const Reservation = require('../../entity/reservation');

const serviceMock = {
  save: jest.fn(),
  delete: jest.fn(() => Promise.resolve(true)),
  getById: jest.fn((id) => createTestReservation(id)),
  getAll: jest.fn(() => Array.from({ length: 3 }, (id) => createTestReservation(id + 1))),
  pay: jest.fn(),
};

const carServiceMock = {
  getAll: jest.fn(),
  getById: jest.fn(() => ({
    car: undefined,
  })),
};

const userServiceMock = {
  getAll: jest.fn(),
};

const reqMock = {
  params: { id: 1 },
};

const resMock = {
  render: jest.fn(),
  redirect: jest.fn(),
};

const mockController = new ReservationController(
  serviceMock,
  carServiceMock,
  userServiceMock,
);
describe('Reservation Controller', () => {
  afterEach(() => {
    Object.values(serviceMock).forEach((mockFn) => mockFn.mockClear());
    Object.values(resMock).forEach((mockFn) => mockFn.mockClear());
  });
  describe('Test routes', () => {
    test('Test each route', () => {
      const app = {
        get: jest.fn(),
        post: jest.fn(),
      };
      mockController.configureRoutes(app);
      expect(app.get).toHaveBeenCalled();
      expect(app.post).toHaveBeenCalled();
    });
  });

  describe('Manage', () => {
    test('Manage render manage.njk', async () => {
      const users = userServiceMock.getAll();
      const reservations = serviceMock.getAll();
      await mockController.manage(reqMock, resMock);
      expect(serviceMock.getAll).toHaveBeenCalledTimes(2);
      expect(resMock.render).toHaveBeenCalledTimes(1);
      expect(resMock.render).toHaveBeenCalledWith('reservation/views/manage.njk', {
        users,
        reservations,
      });
    });
  });
  describe('Create', () => {
    test('Create render reservation.njk', async () => {
      const users = userServiceMock.getAll();
      const cars = carServiceMock.getAll();

      await mockController.create(reqMock, resMock);

      expect(resMock.render).toHaveBeenCalledTimes(1);
      expect(resMock.render).toHaveBeenCalledWith('reservation/views/reservation.njk', {
        cars,
        users,
      });
    });
  });
  describe('Edit', () => {
    test('Edit render edit.njk', async () => {
      const reservation = serviceMock.getById(1);
      const cars = carServiceMock.getAll();
      const users = userServiceMock.getAll();

      await mockController.edit(reqMock, resMock);

      expect(serviceMock.getById).toHaveBeenCalledTimes(2);
      expect(resMock.render).toHaveBeenCalledTimes(1);
      expect(resMock.render).toHaveBeenCalledWith('reservation/views/edit.njk', {
        reservation,
        cars,
        users,
      });
    });
    test('Edit throw ReservationIdNotDefinedError error', async () => {
      const reqWithoutIdMock = { params: { undefined } };
      await expect(mockController.edit(reqWithoutIdMock, resMock)).rejects.toThrowError(
        ReservationIdNotDefinedError,
      );
    });
  });
  describe('View', () => {
    test('View render view.njk', async () => {
      const reservation = serviceMock.getById(1);
      await mockController.view(reqMock, resMock);
      expect(serviceMock.getById).toHaveBeenCalledTimes(2);
      expect(resMock.render).toHaveBeenCalledTimes(1);
      expect(resMock.render).toHaveBeenCalledWith('reservation/views/view.njk', {
        reservation,
      });
    });
    test('View throw ReservationIdNotDefinedError error', async () => {
      const reqWithoutIdMock = { params: {} };
      await expect(mockController.view(reqWithoutIdMock, resMock)).rejects.toThrowError(
        ReservationIdNotDefinedError,
      );
    });
  });
  describe('Save', () => {
    test('Save a new reservation', async () => {
      const reqFormMock = {
        body: {
          id: undefined,
          'start-date': '2023-03-01',
          'finish-date': '2023-03-05',
          dayPrice: 1000,
          totalPrice: 5000,
          'payment-method': 'Cash',
          paid: 'Yes',
          'car-id': 1,
          'user-id': 1,
        },
      };
      await mockController.save(reqFormMock, resMock);
      const car = { undefined };
      expect(serviceMock.save).toHaveBeenCalledTimes(1);
      expect(serviceMock.save).toHaveBeenCalledWith(createTestReservation(), car);

      const savedUser = serviceMock.save.mock.calls[0][0];
      expect(savedUser.carId).toBe(1);
      expect(savedUser.userId).toBe(1);

      expect(resMock.redirect).toHaveBeenCalledTimes(1);
      expect(resMock.redirect).toHaveBeenCalledWith('/reservation/manage');
    });
  });

  describe('Delete', () => {
    test('Delete a user', async () => {
      const FAKE_RESERVATION = new Reservation({ id: 1 });
      serviceMock.getById.mockImplementationOnce(() => Promise.resolve(FAKE_RESERVATION));
      const redirectMock = jest.fn();

      await mockController.delete({ params: { id: 1 } }, { redirect: redirectMock });

      expect(serviceMock.delete).toHaveBeenCalledTimes(1);
      expect(serviceMock.delete).toHaveBeenCalledWith(FAKE_RESERVATION);

      expect(redirectMock).toHaveBeenCalledTimes(1);
      expect(redirectMock).toHaveBeenCalledWith('/reservation/manage');
    });
  });

  describe('Pay', () => {
    test('Pay: change isPaid for yes', async () => {
      const reservation = serviceMock.getById(1);

      await mockController.pay(reqMock, resMock);
      expect(serviceMock.getById).toHaveBeenCalledTimes(2);

      expect(serviceMock.pay).toHaveBeenCalledTimes(1);
      expect(serviceMock.pay).toHaveBeenCalledWith(reservation);

      expect(resMock.redirect).toHaveBeenCalledTimes(1);
      expect(resMock.redirect).toHaveBeenCalledWith('/reservation/manage');
    });
    test('Pay throw ReservationIdNotDefinedError error', async () => {
      const reqWithoutIdMock = { params: {} };
      await expect(mockController.pay(reqWithoutIdMock, resMock)).rejects.toThrowError(
        ReservationIdNotDefinedError,
      );
    });
  });
});
