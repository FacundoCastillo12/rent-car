/* eslint-disable no-undef */
const { init } = require('../module');

const app = jest.fn();

const controller = {
  configureRoutes: jest.fn(),
};

const container = {
  get: jest.fn(() => controller),
};

describe('Module', () => {
  test('ReservationModule: Starts correctly', () => {
    init(app, container);

    expect(container.get).toHaveBeenCalledTimes(1);
    expect(container.get).toHaveBeenCalledWith('ReservationController');

    expect(controller.configureRoutes).toHaveBeenCalledTimes(1);
    expect(controller.configureRoutes).toHaveBeenCalledWith(app);
  });
});
