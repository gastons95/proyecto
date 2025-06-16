'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Color extends Model {
    static associate(models) {
      // Un color tiene muchos productos
      Color.hasMany(models.Product, { as: 'products', foreignKey: 'colorId' });
    }
  }
  Color.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }
  }, {
    sequelize,
    modelName: 'Color',
    tableName: 'colors',
    timestamps: false
  });
  return Color;
};