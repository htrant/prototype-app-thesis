const pgclient = require('../helper/pgclient');

module.exports.getAllCountries = (event, context, callback) => {
  pgclient.connect()
    .then((client) => {
      client.query('SELECT * FROM prototype.country')
        .then((res) => {
          client.release(true);
          const response = {
            statusCode: 200,
            body: JSON.stringify(res.rows)
          };
          callback(null, response);
        });
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
      client.query(queryCmd)
        .then((res) => {
          client.release(true);
          if (JSON.parse(JSON.stringify(res.rows[0]))) {
            const response = {
              statusCode: 200,
              body: JSON.stringify(res.rows[0])
            };
            callback(null, response);
          } else {
            return Promise.reject(new Error('Country not found'));
          }
        });
    })
    .catch((err) => {
      callback(err);
    });
};
