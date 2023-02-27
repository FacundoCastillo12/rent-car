/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
const { Sequelize } = require('sequelize');
const UserRepository = require('../userRepository');
const UserModel = require('../../model/userModel');
const UserNotFoundError = require('../../error/userNotFoundError');
const reservationModel = require('../../../reservation/model/reservationModel');
const UserIdNotDefinedError = require('../../error/userIdNotDefinedError');
const createTestUser = require('../../controller/__test__/user.fixture');

describe('Car Repository', () => {
  const sequelize = new Sequelize('sqlite::memory');
  const userModel = UserModel.setup(sequelize);
  const ReservationModel = reservationModel.setup(sequelize);
  userModel.hasMany(ReservationModel, { foreignKey: 'carId' });
  ReservationModel.belongsTo(userModel, { foreignKey: 'carId' });
  const mockRepository = new UserRepository(userModel);
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });
  describe('Save', () => {
    test('Save a new user without ID in database', async () => {
      const userWithoutId = createTestUser();
      const newUser = await mockRepository.save(userWithoutId);
      expect(newUser.id).toEqual(1);
      expect(newUser.docNumber).toEqual(12121212);
      expect(newUser.phone).toEqual('0264123456');
    });
    test('Save a car with ID in database = edit', async () => {
      const userWithId = createTestUser(1);
      const newUser = await mockRepository.save(userWithId);
      expect(newUser.id).toEqual(1);
      expect(newUser.docNumber).toEqual(12121212);
      expect(newUser.phone).toBe('0264123456');
    });
  });
  describe('Delete', () => {
    test('Delete a user', async () => {
      const userWithoutId = createTestUser();
      const newUser = await mockRepository.save(userWithoutId);
      const result = await mockRepository.delete(newUser);
      expect(result).toBe(true);
    });
    test('Delete throw UserIdNotDefinedError', async () => {
      const user = { firstName: 'Pedro', lastName: 'Gimenez' };
      await expect(mockRepository.delete(user)).rejects.toThrow(UserIdNotDefinedError);
    });
  });
  describe('GetById', () => {
    test('GetById: Get a user from database', async () => {
      const userWithoutId = createTestUser();
      await mockRepository.save(userWithoutId);

      const {
        id, phone, docNumber,
      } = await mockRepository.getById(1);

      expect(id).toEqual(1);
      expect(docNumber).toEqual(12121212);
      expect(phone).toBe('0264123456');
    });
    test('GetById: throw CarNotFoundError', async () => {
      const userRepository = new UserRepository({
        findOne: jest.fn().mockResolvedValue(undefined),
      });
      await expect(userRepository.getById(1)).rejects.toThrow(UserNotFoundError);
    });
  });
  describe('GetAll', () => {
    test('GetAll: Get all users from basedate', async () => {
      const firstUser = createTestUser();
      const secondUser = createTestUser();
      await mockRepository.save(firstUser);
      await mockRepository.save(secondUser);
      const cars = await mockRepository.getAll();
      expect(cars[0].id).toEqual(1);
      expect(cars[1].id).toEqual(2);
      expect(cars[0].docNumber).toEqual(12121212);
      expect(cars[1].docNumber).toEqual(12121212);
    });
  });
});
