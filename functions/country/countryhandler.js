const pgclient = require('../helper/pgclient');

module.exports.getAllCountries = (event, context, callback) => {
  pgclient.query('SELECT * FROM prototype.country')
    .then((res) => {
      const response = {
        statusCode: 200,
        body: JSON.stringify(res.rows)
      };
      callback(null, response);
    })
    .catch((err) => {
      callback(err);
    });
};

module.exports.getCountryById = (event, context, callback) => {
  const queryCmd = `SELECT * FROM prototype.country 
                    WHERE country_id = ${event.id} 
                    LIMIT 1`;
  pgclient.query(queryCmd)
    .then((res) => {
      const response = {
        statusCode: 200,
        body: JSON.stringify(res.rows[0])
      };
      callback(null, response);
    })
    .catch((err) => {
      callback(err);
    });
};
