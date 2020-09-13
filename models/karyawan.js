'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class karyawan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  karyawan.init({
    email: DataTypes.STRING,
    photo: DataTypes.STRING,
    name: DataTypes.STRING,
    jabatan: DataTypes.STRING,
    deskripsi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'karyawan',
  });
  return karyawan;
};