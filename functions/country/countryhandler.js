const pgclient = require('../helper/pgclient');
const pgquery = require('../helper/pgquery');

module.exports.getAllCountries = (event, context, callback) => {
  pgclient.connect()
    .then((client) => {
      return pgquery.queryDatabase(client, 'SELECT * FROM prototype.country');
    })
    .then((res) => {
      res.client.release(true);
      const response = {
        statusCode: 200,
        body: JSON.stringify(res.data.rows)
      };
      callback(null, response);
    })
    .catch((err) => {
      callback(null, {
        statusCode: 400,
        body: JSON.stringify(err)
      });
    });
};

module.exports.getCountryById = (event, context, callback) => {
  const queryCmd = `SELECT * FROM prototype.country
                    WHERE country_id = ${event.pathParameters.id}
                    LIMIT 1`;
  pgclient.connect()
    .then((client) => {
      return pgquery.queryDatabase(client, queryCmd);
    })
    .then((res) => {
      res.client.release(true);
      if (!JSON.stringify(res.data.rows[0])) {
        return Promise.reject({
          error: 'Country not found',
          code: 404
        });
      }
      return Promise.resolve({
        statusCode: 200,
        body: JSON.stringify(res.data.rows[0])
      });
    })
    .then((res) => {
      callback(null, res);
    })
    .catch((err) => {
      callback(null, {
        statusCode: (err.code ? err.code : 400),
        body: JSON.stringify(err)
      });
    });
};
