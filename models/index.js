require('dotenv').config({
  silent: true
});
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const dbconfig = {
  dialect: 'postgres',
  schema: process.env.DB_PG_SCHEMA,
  sync: {
    force: false
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
};
const sqlz = new Sequelize(process.env.DB_LOCAL, dbconfig);

const db = {};
fs.readdirSync(__dirname)
  .filter(file => (
    file.indexOf('.') !== 0) && (file !== 'index.js')
  )
  .forEach((file) => {
    const model = sqlz.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sqlz;
db.Sequelize = Sequelize;

module.exports = db;
