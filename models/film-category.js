module.exports = (sequelize, DataTypes) => (sequelize.define('FilmCategory', {
  film_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  last_update: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  schema: 'prototype',
  tableName: 'film_category',
  timestamps: false,
  underscored: true,
  freezeTableName: true
})).sync({
  force: false
});
