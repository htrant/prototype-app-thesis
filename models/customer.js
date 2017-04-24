module.exports = (sequelize, DataTypes) => (sequelize.define('Customer', {
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  store_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  address_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  activebool: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  create_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.NOW
  },
  last_update: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: sequelize.NOW
  },
  active: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  schema: 'prototype',
  tableName: 'customer',
  timestamps: false,
  underscored: true,
  freezeTableName: true
})).sync({
  force: false
});
