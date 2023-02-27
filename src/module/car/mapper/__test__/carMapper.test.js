/* eslint-disable no-undef */
const { fromModelToEntity } = require('../carMapper');
const CarEntity = require('../../entity/car');

describe('CarMapper', () => {
  test('Test fromModelToEntity', () => {
    expect(
      fromModelToEntity({
        toJSON() {
          return {};
        },
      }),
    ).toBeInstanceOf(CarEntity);
  });
});
