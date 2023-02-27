const { Model, DataTypes } = require('sequelize');

module.exports = class UserModel extends Model {
  /**
   * @param {import('sequelize').Sequelize} sequelizeInstance
   * @returns {typeof UserModel}
   */
  static setup(sequelizeInstance) {
    UserModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          unique: true,
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        docType: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        docNumber: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        nationality: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        birthdate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize: sequelizeInstance,
        modelName: 'User',
        tablename: 'users',
        timestamps: true,
      },
    );

    return UserModel;
  }
};
