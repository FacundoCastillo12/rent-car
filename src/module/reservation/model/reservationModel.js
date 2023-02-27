const { Model, DataTypes } = require('sequelize');

module.exports = class ReservationModel extends Model {
  /**
   * @param {import('sequelize').Sequelize} sequelizeInstance
   * @returns {typeof ReservationModel}
   */
  static setup(sequelizeInstance) {
    ReservationModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          unique: true,
        },
        startDate: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        finishDate: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        dayPrice: {
          type: DataTypes.DECIMAL,
          allowNull: false,
        },
        totalPrice: {
          type: DataTypes.DECIMAL,
          allowNull: false,
        },
        paymentMethod: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        isPaid: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize: sequelizeInstance,
        modelName: 'Reservation',
        tableName: 'Reservations',
      },
    );

    return ReservationModel;
  }

  static setupAssociations(CarModel, UserModel) {
    CarModel.hasMany(ReservationModel, { foreignKey: 'carId', constraints: true });
    ReservationModel.belongsTo(CarModel, { foreignKey: 'carId', constraints: true });
    UserModel.hasMany(ReservationModel, { foreignKey: 'userId', constraints: true });
    ReservationModel.belongsTo(UserModel, { foreignKey: 'userId', constraints: true });
  }
};
