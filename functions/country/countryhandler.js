const pgclient = require('../helper/pgclient');

function queryDatabase(client, query) {
  return new Promise((resolve, reject) => {
    client.query(query)
      .then((res) => {
        resolve({
          client,
          data: res
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports.getAllCountries = (event, context, callback) => {
  pgclient.connect()
    .then((client) => {
      return queryDatabase(client, 'SELECT * FROM prototype.country');
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
      callback(err);
    });
};

module.exports.getCountryById = (event, context, callback) => {
  const queryCmd = `SELECT * FROM prototype.country
                    WHERE country_id = ${event.pathParameters.id}
                    LIMIT 1`;
  pgclient.connect()
    .then((client) => {
      return queryDatabase(client, queryCmd);
    })
    .then((res) => {
      res.client.release(true);
      if (!JSON.stringify(res.data.rows[0])) {
        return Promise.reject(new Error('Country not found'));
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
      callback(err);
    });
};
