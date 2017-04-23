module.exports = (sequelize, DataTypes) => {
  const CityModel = sequelize.define('City',
    {
      city_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false
      },
      country_code: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      last_update: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.NOW
      }
    },
    {
      schema: 'prototype',
      tableName: 'city',
      timestamps: false,
      underscored: true,
      freezeTableName: true
    });
  CityModel.sync({
    force: false
  });
  return CityModel;
};
