module.exports = (sequelize, DataTypes) => {
  const ActorModel = sequelize.define('Actor', {
    actor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
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
    tableName: 'actor',
    timestamps: false,
    underscored: true,
    freezeTableName: true
  });
  ActorModel.sync({
    force: false
  });
  return ActorModel;
};
