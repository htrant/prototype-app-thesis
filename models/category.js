module.exports = (sequelize, DataTypes) => (sequelize.define('Category', {
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_update: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  schema: 'prototype',
  tableName: 'category',
  timestamps: false,
  underscored: true,
  freezeTableName: true
})).sync({
  force: false
});
