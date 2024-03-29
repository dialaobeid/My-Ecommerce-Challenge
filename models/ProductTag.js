const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ProductTag extends Model {
  // Define association
  static associate(models) {
    this.belongsTo(models.Product, { foreignKey: 'product_id' });
    this.belongsTo(models.Tag, { foreignKey: 'tag_id' });
  }
}

ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false // Doesn't allow null values
    },
    product_id: {
      type: DataTypes.INTEGER, // Integer data type
      references: {
        model: 'product', // References the Product model
        key: 'id' // References the id column of the Product model
      }
    },
    tag_id: {
      type: DataTypes.INTEGER, // Integer data type
      references: {
        model: 'tag', // References the Tag model
        key: 'id' // References the id column of the Tag model
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
