/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
const UserService = require('../userService');
const UserNotDefinedError = require('../../error/userNotDefinedError');
const UserIdNotDefinedError = require('../../error/userIdNotDefinedError');
const User = require('../../entity/user');

const repositoryMock = {
  save: jest.fn(),
  delete: jest.fn(),
  getById: jest.fn(),
  getAll: jest.fn(),
};

const service = new UserService(repositoryMock);

describe('UserService', () => {
  afterEach(() => {
    Object.values(repositoryMock).forEach((mockFn) => mockFn.mockClear());
  });
  describe('Save', () => {
    test('Save a User and call repository save once', () => {
      service.save({});
      expect(repositoryMock.save).toHaveBeenCalledTimes(1);
    });
    test('Save throw UserNotDefinedError', async () => {
      await expect(service.save).rejects.toThrowError(UserNotDefinedError);
    });
  });
  describe('Delete', () => {
    test('Delete a User and call repository delete once', () => {
      service.delete(new User({ id: 1 }));
      expect(repositoryMock.delete).toHaveBeenCalledTimes(1);
    });
    test('Delete throw UserNotDefinedError', async () => {
      await expect(service.delete).rejects.toThrowError(UserNotDefinedError);
    });
  });
  describe('GetById', () => {
    test('Get a User and call repository getById once', () => {
      service.getById(1);
      expect(repositoryMock.getById).toHaveBeenCalledTimes(1);
    });
    test('GetById throw UserIdNotDefinedError', async () => {
      await expect(service.getById).rejects.toThrowError(UserIdNotDefinedError);
    });
  });
  describe('GetAll', () => {
    test('Get all users and call repository getAll once', () => {
      service.getAll();
      expect(repositoryMock.getAll).toHaveBeenCalledTimes(1);
    });
  });
});
