module.exports = (sequelize, DataTypes) => {
  const CountryModel = sequelize.define('Country', {
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.NOW
    }
  }, {
    schema: 'prototype',
    tableName: 'country',
    timestamps: false,
    underscored: true,
    freezeTableName: true
  });
  CountryModel.sync({
    force: false
  });
  return CountryModel;
};
