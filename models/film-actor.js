module.exports = (sequelize, DataTypes) => (sequelize.define('FilmActor', {
  actor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  film_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  last_update: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  schema: 'prototype',
  tableName: 'film_actor',
  timestamps: false,
  underscored: true,
  freezeTableName: true
})).sync({
  force: false
});
