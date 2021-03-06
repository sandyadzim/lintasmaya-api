"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class absen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      absen.belongsTo(models.user, { as: "users", foreignKey: "user_id" });
    }
  }
  absen.init(
    {
      latitude: DataTypes.STRING,
      longitude: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "absen",
    }
  );
  return absen;
};
