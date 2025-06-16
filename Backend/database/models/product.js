'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
  Product.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  Product.belongsTo(models.Category, { as: 'category', foreignKey: 'categoryId' });
  Product.belongsTo(models.Brand, { as: 'brand', foreignKey: 'brandId' });
  Product.belongsTo(models.Color, { as: 'color', foreignKey: 'colorId' });
  Product.belongsTo(models.Size, { as: 'size', foreignKey: 'sizeId' });
    }
  }

  Product.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    brandId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    colorId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    sizeId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: false
  });

  return Product;
};