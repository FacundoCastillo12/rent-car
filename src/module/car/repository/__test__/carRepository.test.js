/* eslint-disable no-undef */
const { Sequelize } = require('sequelize');
const CarRepository = require('../carRepository');
const CarModel = require('../../model/carModel');
const reservationModel = require('../../../reservation/model/reservationModel');
const CarNotFoundError = require('../error/carNotFoundError');
const CarIdNotDefinedError = require('../error/carIdNotDefinedError');
const createTestCar = require('../../controller/__test__/cars.fixture');

describe('Car Repository', () => {
  const sequelize = new Sequelize('sqlite::memory');
  const carModel = CarModel.setup(sequelize);
  const ReservationModel = reservationModel.setup(sequelize);
  carModel.hasMany(ReservationModel, { foreignKey: 'carId' });
  ReservationModel.belongsTo(carModel, { foreignKey: 'carId' });
  const mockRepository = new CarRepository(carModel);
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });
  describe('Save', () => {
    test('Save a new car without ID in database', async () => {
      const carWithoutId = createTestCar();
      const newCar = await mockRepository.save(carWithoutId);
      expect(newCar.id).toEqual(1);
      expect(newCar.brand).toEqual('BWM');
      expect(newCar.price).toEqual(5000);
      expect(newCar.transmission).toEqual('Automatic');
    });
    test('Save a car with ID in database', async () => {
      const carWithId = createTestCar(1);
      const newCar = await mockRepository.save(carWithId);
      expect(newCar.id).toEqual(1);
      expect(newCar.brand).toEqual('BWM');
      expect(newCar.price).toEqual(5000);
      expect(newCar.transmission).toEqual('Automatic');
    });
  });
  describe('Delete', () => {
    test('Delete a car', async () => {
      const carWithoutId = createTestCar();
      const newCar = await mockRepository.save(carWithoutId);
      const result = await mockRepository.delete(newCar);
      expect(result).toBe(true);
    });
    test('Delete throw CarIdNotDefinedError', async () => {
      const car = { brand: 'Toyota', model: 'Corolla' };
      await expect(mockRepository.delete(car)).rejects.toThrow(CarIdNotDefinedError);
    });
  });
  describe('GetById', () => {
    test('GetById: Get a car from database', async () => {
      const carWithoutId = createTestCar();
      await mockRepository.save(carWithoutId);

      const {
        id, brand, price, transmission,
      } = await mockRepository.getById(1);

      expect(id).toEqual(1);
      expect(brand).toEqual('BWM');
      expect(price).toEqual(5000);
      expect(transmission).toEqual('Automatic');
    });
    test('GetById: throw CarNotFoundError', async () => {
      const carRepository = new CarRepository({
        findByPk: jest.fn().mockResolvedValue(undefined),
      });
      await expect(carRepository.getById(1)).rejects.toThrow(CarNotFoundError);
    });
  });
  describe('GetAll', () => {
    test('GetAll: Get all cars from basedate', async () => {
      const firstCar = createTestCar();
      const secondCar = createTestCar();
      await mockRepository.save(firstCar);
      await mockRepository.save(secondCar);
      const cars = await mockRepository.getAll();
      expect(cars[0].id).toEqual(1);
      expect(cars[1].id).toEqual(2);
      expect(cars[0].brand).toEqual('BWM');
      expect(cars[1].brand).toEqual('BWM');
    });
  });
});
