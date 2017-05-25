const pgclient = require('../helper/pgclient');
const moment = require('moment');

const timeformat = 'YYYY-MM-DD HH:mm:ssZ';

const lambdaResponse = (object) => {
  return {
    statusCode: 200,
    body: JSON.stringify(object)
  };
};

module.exports.getAllActors = (event, context, callback) => {
  pgclient.connect()
    .then((client) => {
      client.query('SELECT * FROM prototype.actor')
        .then((res) => {
          client.release(true);
          callback(null, lambdaResponse(res.rows));
        });
    })
    .catch((err) => {
      callback(err);
    });
};

module.exports.getActorById = (event, context, callback) => {
  const queryCmd = `SELECT * FROM prototype.actor 
                    WHERE actor_id = ${event.pathParameters.id} 
                    LIMIT 1`;
  pgclient.connect()
    .then((client) => {
      client.query(queryCmd)
        .then((res) => {
          client.release(true);
          callback(null, lambdaResponse(res.rows[0]));
        });
    })
    .catch((err) => {
      callback(err);
    });
};

module.exports.createNewActor = (event, context, callback) => {
  const lastUpdate = moment().format(timeformat);
  const queryCmd = `INSERT INTO prototype.actor (first_name, last_name, last_update)
                    VALUES ('${event.first_name}', '${event.last_name}', '${lastUpdate}')
                    RETURNING last_update`;
  pgclient.connect()
    .then((client) => {
      client.query(queryCmd)
        .then((res) => {
          client.release(true);
          callback(null, lambdaResponse(res.rows[0]));
        });
    })
    .catch((err) => {
      callback(err);
    });
};

module.exports.updateActor = (event, context, callback) => {
  if (event.first_name === undefined || event.last_name === undefined) {
    callback('Empty first name or last name');
  } else {
    const lastUpdate = moment().format(timeformat);
    const updateQuery = `UPDATE prototype.actor
                         SET first_name = '${event.first_name}',
                          last_name = '${event.last_name}',
                          last_update = '${lastUpdate}'
                         WHERE actor_id = ${event.pathParameters.id}
                         RETURNING last_update`;
    const selQuery = `SELECT COUNT(actor_id) 
                      FROM prototype.actor
                      WHERE actor_id = ${event.pathParameters.id}`;
    pgclient.connect()
      .then((client) => {
        client.query(selQuery)
          .then((res) => {
            const count = JSON.parse(JSON.stringify(res.rows[0])).count;
            if (count === '0') {
              return Promise.reject(new Error('actor not found'));
            }
            return pgclient.query(updateQuery);
          })
          .then((res) => {
            client.release(true);
            callback(null, lambdaResponse(res.rows[0]));
          });
      })
      .catch((err) => {
        callback(err);
      });
  }
};

module.exports.deleteActor = (event, context, callback) => {
  const delQuery = `DELETE FROM prototype.actor
                    WHERE actor_id = ${event.pathParameters.id}
                    RETURNING last_update`;
  const selQuery = `SELECT COUNT(actor_id) 
                    FROM prototype.actor
                    WHERE actor_id = ${event.pathParameters.id}`;
  pgclient.connect()
    .then((client) => {
      client.query(selQuery)
        .then((res) => {
          const count = JSON.parse(JSON.stringify(res.rows[0])).count;
          if (count === '0') {
            return Promise.reject(new Error('actor not found'));
          }
          return pgclient.query(delQuery);
        })
        .then((res) => {
          client.release(true);
          callback(null, lambdaResponse(res.rows[0]));
        });
    })
    .catch((err) => {
      callback(err);
    });
};
