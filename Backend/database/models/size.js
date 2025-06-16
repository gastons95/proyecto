'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Size extends Model {
    static associate(models) {
      // Un talle tiene muchos productos
      Size.hasMany(models.Product, { as: 'products', foreignKey: 'sizeId' });
    }
  }
  Size.init({
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
    modelName: 'Size',
    tableName: 'sizes',
    timestamps: false
  });
  return Size;
};