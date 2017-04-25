module.exports = (sequelize, DataTypes) => (sequelize.define('Film', {
  film_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  release_year: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  language_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  rental_duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: '3'
  },
  rental_rate: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: '4.99'
  },
  length: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  replacement_cost: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: '19.99'
  },
  rating: {
    type: DataTypes.ENUM('G', 'PG', 'PG-13', 'R', 'NC-17'),
    allowNull: true,
    defaultValue: 'G'
  },
  last_update: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.NOW
  },
  special_features: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  fulltext: {
    type: DataTypes.HSTORE,
    allowNull: false
  }
}, {
  schema: 'prototype',
  tableName: 'film',
  timestamps: false,
  underscored: true,
  freezeTableName: true
})).sync({
  force: false
});
