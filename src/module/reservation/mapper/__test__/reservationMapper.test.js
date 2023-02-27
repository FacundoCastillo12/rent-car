/* eslint-disable no-undef */
const { fromModelToEntity } = require('../reservationMapper');
const ReservationEntity = require('../../entity/reservation');

describe('CarMapper', () => {
  test('Test fromModelToEntity', () => {
    expect(
      fromModelToEntity({
        toJSON() {
          return {};
        },
      }),
    ).toBeInstanceOf(ReservationEntity);
  });
});
