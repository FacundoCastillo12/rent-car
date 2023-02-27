/* eslint-disable no-undef */
const CarController = require('../carController');
const createTestCar = require('./cars.fixture');
const CarIdNotDefinedError = require('../error/CarIdNotDefinedError');
const Car = require('../../entity/car');

const serviceMock = {
  save: jest.fn(),
  delete: jest.fn(() => Promise.resolve(true)),
  getById: jest.fn((id) => createTestCar(id)),
  getAll: jest.fn(() => Array.from({ length: 3 }, (id) => createTestCar(id + 1))),
};

const uploadMock = {
  single: jest.fn(),
};
const reqMock = {
  params: { id: 1 },
};
const resMock = {
  render: jest.fn(),
  redirect: jest.fn(),
};
const mockController = new CarController(uploadMock, serviceMock);
describe('Car controller', () => {
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
      expect(uploadMock.single).toHaveBeenCalled();
    });
  });
  describe('Index', () => {
    test('Index render index.njk', async () => {
      const cars = serviceMock.getAll();
      await mockController.index(reqMock, resMock);
      expect(serviceMock.getAll).toHaveBeenCalledTimes(2);
      expect(resMock.render).toHaveBeenCalledTimes(1);
      expect(resMock.render).toHaveBeenCalledWith('car/views/index.njk', {
        cars,
      });
    });
  });
  describe('Manage', () => {
    test('Manage render manage.njk', async () => {
      const cars = serviceMock.getAll();
      await mockController.manage(reqMock, resMock);
      expect(serviceMock.getAll).toHaveBeenCalledTimes(2);
      expect(resMock.render).toHaveBeenCalledTimes(1);
      expect(resMock.render).toHaveBeenCalledWith('car/views/manage.njk', {
        cars,
      });
    });
  });
  describe('View', () => {
    test('View render view.njk', async () => {
      const car = serviceMock.getById(1);
      await mockController.view(reqMock, resMock);
      expect(serviceMock.getById).toHaveBeenCalledTimes(2);
      expect(resMock.render).toHaveBeenCalledTimes(1);
      expect(resMock.render).toHaveBeenCalledWith('car/views/view.njk', {
        car,
      });
    });
    test('View throw CarIdNotDefinedError error', async () => {
      const reqWithoutIdMock = { params: {} };
      await expect(mockController.view(reqWithoutIdMock, resMock)).rejects.toThrowError(
        CarIdNotDefinedError,
      );
    });
  });
  describe('Add', () => {
    test('Add render create.njk', async () => {
      await mockController.add(reqMock, resMock);

      expect(resMock.render).toHaveBeenCalledTimes(1);
      expect(resMock.render).toHaveBeenCalledWith('car/views/create.njk');
    });
  });
  describe('Edit', () => {
    test('Edit render edit.njk', async () => {
      const car = serviceMock.getById(1);
      await mockController.edit(reqMock, resMock);
      expect(serviceMock.getById).toHaveBeenCalledTimes(2);
      expect(resMock.render).toHaveBeenCalledTimes(1);
      expect(resMock.render).toHaveBeenCalledWith('car/views/edit.njk', {
        car,
      });
    });
    test('Edit throw CarIdNotDefinedError error', async () => {
      const reqWithoutIdMock = { params: { undefined } };
      await expect(mockController.edit(reqWithoutIdMock, resMock)).rejects.toThrowError(
        CarIdNotDefinedError,
      );
    });
  });
  describe('Save', () => {
    test('Save a new car with image', async () => {
      const reqFormMock = {
        body: {
          id: 1,
          brand: 'BWM',
          model: 'Serie 3',
          year: '2020',
          kms: '25000',
          colour: 'Red',
          air: 'Yes',
          passenger: '4',

          transmission: 'Automatic',
          price: '5000',
        },
        file: {
          path: '/img/1677377494262.jpg',
        },
      };
      await mockController.save(reqFormMock, resMock);
      expect(serviceMock.save).toHaveBeenCalledTimes(1);
      expect(serviceMock.save).toHaveBeenCalledWith(expect.any(Car));
      expect(serviceMock.save).toHaveBeenCalledWith(
        expect.objectContaining({
          img: '/img/1677377494262.jpg',
        }),
      );
      const savedCar = serviceMock.save.mock.calls[0][0];
      expect(savedCar.id).toBe(1);
      expect(savedCar.brand).toBe('BWM');
      expect(savedCar.model).toBe('Serie 3');
      expect(savedCar.year).toBe(2020);
      expect(savedCar.kms).toBe(25000);
      expect(savedCar.colour).toBe('Red');
      expect(savedCar.air).toBe('Yes');
      expect(savedCar.passenger).toBe(4);
      expect(savedCar.img).toBe('/img/1677377494262.jpg');
      expect(savedCar.transmission).toBe('Automatic');
      expect(savedCar.price).toBe(5000);
      expect(resMock.redirect).toHaveBeenCalledTimes(1);
      expect(resMock.redirect).toHaveBeenCalledWith('/car/manage');
    });
    test('Save a new car without image', async () => {
      const reqFormMock = {
        body: {
          id: 1,
          brand: 'BWM',
          model: 'Serie 3',
          year: '2020',
          kms: '25000',
          colour: 'Red',
          air: 'Yes',
          passenger: '4',
          transmission: 'Automatic',
          price: '5000',
        },
      };
      await mockController.save(reqFormMock, resMock);
      expect(serviceMock.save).toHaveBeenCalledTimes(1);
      expect(serviceMock.save).toHaveBeenCalledWith(expect.any(Car));
      expect(serviceMock.save).toHaveBeenCalledWith(
        expect.objectContaining({
          img: undefined,
        }),
      );
    });
  });
  describe('Delete', () => {
    test('Delete a car', async () => {
      const FAKE_CAR = new Car({ id: 1 });
      serviceMock.getById.mockImplementationOnce(() => Promise.resolve(FAKE_CAR));
      const redirectMock = jest.fn();

      await mockController.delete({ params: { id: 1 } }, { redirect: redirectMock });

      expect(serviceMock.delete).toHaveBeenCalledTimes(1);
      expect(serviceMock.delete).toHaveBeenCalledWith(FAKE_CAR);

      expect(redirectMock).toHaveBeenCalledTimes(1);
      expect(redirectMock).toHaveBeenCalledWith('/car');
    });
  });
});
