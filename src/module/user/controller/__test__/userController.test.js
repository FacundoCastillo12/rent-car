/* eslint-disable no-undef */
const UserController = require('../userController');
const createTestUser = require('./user.fixture');
const UserIdNotDefinedError = require('../../error/UserIdNotDefinedError');
const User = require('../../entity/user');

const serviceMock = {
  save: jest.fn(),
  delete: jest.fn(() => Promise.resolve(true)),
  getById: jest.fn((id) => createTestUser(id)),
  getAll: jest.fn(() => Array.from({ length: 3 }, (id) => createTestUser(id + 1))),
};

const reqMock = {
  params: { id: 1 },
};

const resMock = {
  render: jest.fn(),
  redirect: jest.fn(),
};

const mockController = new UserController(serviceMock);

describe('User Controller', () => {
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
      const users = serviceMock.getAll();
      await mockController.manage(reqMock, resMock);
      expect(serviceMock.getAll).toHaveBeenCalledTimes(2);
      expect(resMock.render).toHaveBeenCalledTimes(1);
      expect(resMock.render).toHaveBeenCalledWith('user/views/manage.njk', {
        users,
      });
    });
  });
  describe('View', () => {
    test('View render view.njk', async () => {
      const user = serviceMock.getById(1);
      await mockController.view(reqMock, resMock);
      expect(serviceMock.getById).toHaveBeenCalledTimes(2);
      expect(resMock.render).toHaveBeenCalledTimes(1);
      expect(resMock.render).toHaveBeenCalledWith('user/views/view.njk', {
        user,
      });
    });
    test('View throw CarIdNotDefinedError error', async () => {
      const reqWithoutIdMock = { params: {} };
      await expect(mockController.view(reqWithoutIdMock, resMock)).rejects.toThrowError(
        UserIdNotDefinedError,
      );
    });
  });
  describe('Edit', () => {
    test('Edit render edit.njk', async () => {
      const user = serviceMock.getById(1);
      await mockController.edit(reqMock, resMock);
      expect(serviceMock.getById).toHaveBeenCalledTimes(2);
      expect(resMock.render).toHaveBeenCalledTimes(1);
      expect(resMock.render).toHaveBeenCalledWith('user/views/edit.njk', {
        user,
      });
    });
    test('Edit throw UserIdNotDefinedError error', async () => {
      const reqWithoutIdMock = { params: { undefined } };
      await expect(mockController.edit(reqWithoutIdMock, resMock)).rejects.toThrowError(
        UserIdNotDefinedError,
      );
    });
  });
  describe('Create', () => {
    test('Create render create.njk', async () => {
      await mockController.create(reqMock, resMock);

      expect(resMock.render).toHaveBeenCalledTimes(1);
      expect(resMock.render).toHaveBeenCalledWith('user/views/create.njk');
    });
  });
  describe('Save', () => {
    test('Save a new user', async () => {
      const reqFormMock = {
        body: {
          id: 1,
          'first-name': 'Emiliano',
          'last-name': 'Rodrigues',
          'doc-type': 'DNI',
          'doc-number': '12121212',
          nationality: 'Argentina',
          address: 'Buenos Aires',
          phone: '0264123456',
          email: 'emiliano@gmail.com',
          birthdate: '12-01-1998',
          createdAt: undefined,
          updatedAt: undefined,
        },
      };
      await mockController.save(reqFormMock, resMock);
      expect(serviceMock.save).toHaveBeenCalledTimes(1);
      expect(serviceMock.save).toHaveBeenCalledWith(expect.any(User));

      const savedUser = serviceMock.save.mock.calls[0][0];
      expect(savedUser.id).toBe(1);
      expect(savedUser.phone).toBe('0264123456');

      expect(resMock.redirect).toHaveBeenCalledTimes(1);
      expect(resMock.redirect).toHaveBeenCalledWith('/user/manage');
    });
  });
  describe('Delete', () => {
    test('Delete a user', async () => {
      const FAKE_USER = new User({ id: 1 });
      serviceMock.getById.mockImplementationOnce(() => Promise.resolve(FAKE_USER));
      const redirectMock = jest.fn();

      await mockController.delete({ params: { id: 1 } }, { redirect: redirectMock });

      expect(serviceMock.delete).toHaveBeenCalledTimes(1);
      expect(serviceMock.delete).toHaveBeenCalledWith(FAKE_USER);

      expect(redirectMock).toHaveBeenCalledTimes(1);
      expect(redirectMock).toHaveBeenCalledWith('/user/manage');
    });
  });
});
