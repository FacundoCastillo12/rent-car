/* eslint-disable no-undef */
const { fromModelToEntity } = require('../userMapper');
const UserEntity = require('../../entity/user');

describe('UserMapper', () => {
  test('Test fromModelToEntity', () => {
    expect(
      fromModelToEntity({
        toJSON() {
          return {};
        },
      }),
    ).toBeInstanceOf(UserEntity);
  });
});
