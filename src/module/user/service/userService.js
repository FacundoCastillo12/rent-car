const UserNotDefinedError = require('../error/UserNotDefinedError');
const UserIdNotDefinedError = require('../error/UserIdNotDefinedError');
const User = require('../entity/user');

module.exports = class UserService {
  /**
   * @param {import('../repository/userRepository')} UserRepository
   */

  constructor(UserRepository) {
    this.userRepository = UserRepository;
  }

  /**
   * @param {User} user
   */
  async save(user) {
    if (user === undefined) {
      throw new UserNotDefinedError();
    }

    return this.userRepository.save(user);
  }

  /**
   * @param {User} user
   */

  async delete(user) {
    if (!(user instanceof User)) {
      throw new UserNotDefinedError();
    }

    return this.userRepository.delete(user);
  }

  async getById(id) {
    if (id === undefined) {
      throw new UserIdNotDefinedError();
    }

    return this.userRepository.getById(id);
  }

  async getAll() {
    return this.userRepository.getAll();
  }
};
