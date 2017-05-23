require('dotenv').config({
  silent: true
});

const Pool = require('pg-pool');
const url = require('url');

let dbconn;
if (process.env.DB_STAGING) {
  dbconn = process.env.DB_STAGING;
} else if (process.env.DB_PROD) {
  dbconn = process.env.DB_PROD;
} else {
  dbconn = process.env.DB_LOCAL;
}

const params = url.parse(dbconn);
const auth = params.auth.split(':');
const config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1]
};

const pool = new Pool(config);
pool.connect();

module.exports.query = (text, values) => {
  return pool.query(text, values);
};
