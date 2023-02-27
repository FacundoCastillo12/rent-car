/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
const CarService = require('../carService');
const CarNotDefinedError = require('../error/carNotDefinedError');
const CarIdNotDefinedError = require('../error/carIdNotDefinedError');
const Car = require('../../entity/car');

const repositoryMock = {
  save: jest.fn(),
  delete: jest.fn(),
  getById: jest.fn(),
  getAll: jest.fn(),
};
const service = new CarService(repositoryMock);
describe('Car Service', () => {
  afterEach(() => {
    Object.values(repositoryMock).forEach((mockFn) => mockFn.mockClear());
  });
  describe('Save', () => {
    test('Save a Car and call repository save once', () => {
      service.save({});
      expect(repositoryMock.save).toHaveBeenCalledTimes(1);
    });
    test('Save throw CarNotDefinedError', async () => {
      await expect(service.save).rejects.toThrowError(CarNotDefinedError);
    });
  });
  describe('Delete', () => {
    test('Delete a Car and call repository delete once', () => {
      service.delete(new Car({ id: 1 }));
      expect(repositoryMock.delete).toHaveBeenCalledTimes(1);
    });
    test('Delete throw CarNotDefinedError', async () => {
      await expect(service.delete).rejects.toThrowError(CarNotDefinedError);
    });
  });
  describe('GetById', () => {
    test('Get a Car and call repository getById once', () => {
      service.getById(1);
      expect(repositoryMock.getById).toHaveBeenCalledTimes(1);
    });
    test('GetById throw CarIdNotDefinedError', async () => {
      await expect(service.getById).rejects.toThrowError(CarIdNotDefinedError);
    });
  });
  describe('GetAll', () => {
    test('Get all car and call repository getAll once', () => {
      service.getAll();
      expect(repositoryMock.getAll).toHaveBeenCalledTimes(1);
    });
  });
});
