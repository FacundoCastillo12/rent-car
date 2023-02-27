const { fromModelToEntity } = require('../mapper/userMapper');

const UserIdNotDefinedError = require('../error/UserIdNotDefinedError');
const UserNotFoundError = require('../error/UserNotFoundError');

module.exports = class UserRepository {
  /**
   * @param {typeof import('../model/userModel')} userModel
   */
  constructor(userModel) {
    this.userModel = userModel;
  }

  /**
   * @param {import('../entity/user')} user
   */

  /**
   * @param {import('../entity/user')} user
   */

  async save(user) {
    let userModel;

    const buildOptions = { isNewRecord: !user.id };
    userModel = this.userModel.build(user, buildOptions);

    userModel = await userModel.save();

    return fromModelToEntity(userModel);
  }

  /**
   * @param {import('../entity/user')} user
   * @returns {Promise<Boolean>}
   */
  async delete(user) {
    if (!user || !user.id) {
      throw new UserIdNotDefinedError('The User ID is not defined');
    }

    return Boolean(await this.userModel.destroy({ where: { id: user.id } }));
  }

  /**
   * @param {Number} id
   * @param {Promise<import('../entity/user')>}
   */
  async getById(id) {
    const userModel = await this.userModel.findOne({
      where: { id },
    });
    if (userModel === undefined) {
      throw new UserNotFoundError(`User with ID not found: ${id}`);
    }

    return fromModelToEntity(userModel);
  }

  /**
   * @param {import('../entity/user')} user
   * @returns {Promise<Boolean>}
   */

  async getAll() {
    const users = await this.userModel.findAll();
    const usersAll = users.map((user) => fromModelToEntity(user));
    return usersAll;
  }
// Actualizar la siguiente.
};
