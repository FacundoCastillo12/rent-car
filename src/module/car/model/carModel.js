const { Model, DataTypes } = require('sequelize');

module.exports = class CarModel extends Model {
  /**
   * @param {import('sequelize').Sequelize} sequelizeInstance
   * @returns {typeof CarModel}
   */
  static setup(sequelizeInstance) {
    CarModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          unique: true,
        },
        brand: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        model: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        year: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        kms: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        colour: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        air: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        passenger: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        img: {
          type: DataTypes.INTEGER,
        },
        transmission: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        price: {
          type: DataTypes.DECIMAL,
          allowNull: false,
        },
      },
      {
        sequelize: sequelizeInstance,
        modelName: 'Car',
      },
    );

    return CarModel;
  }
};
