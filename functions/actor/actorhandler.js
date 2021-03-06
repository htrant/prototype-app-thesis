const pgclient = require('../helper/pgclient');
const pgquery = require('../helper/pgquery');
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
      return pgquery.queryDatabase(client, 'SELECT * FROM prototype.actor');
    })
    .then((res) => {
      res.client.release(true);
      callback(null, lambdaResponse(res.data.rows));
    })
    .catch((err) => {
      callback(null, {
        statusCode: 400,
        body: JSON.stringify(err)
      });
    });
};

module.exports.getActorById = (event, context, callback) => {
  const queryCmd = `SELECT * FROM prototype.actor
                    WHERE actor_id = ${event.pathParameters.id}
                    LIMIT 1`;
  pgclient.connect()
    .then((client) => {
      return pgquery.queryDatabase(client, queryCmd);
    })
    .then((res) => {
      res.client.release(true);
      if (!JSON.stringify(res.data.rows[0])) {
        return Promise.reject({
          error: 'Actor not found',
          code: 200
        });
      }
      return Promise.resolve(res.data.rows[0]);
    })
    .then((res) => {
      callback(null, lambdaResponse(res));
    })
    .catch((err) => {
      callback(null, {
        statusCode: (err.code ? err.code : 400),
        body: JSON.stringify(err)
      });
    });
};

module.exports.createNewActor = (event, context, callback) => {
  const body = JSON.parse(event.body);
  if (body.first_name && body.last_name) {
    const lastUpdate = moment().format(timeformat);
    const queryCmd = `INSERT INTO prototype.actor (first_name, last_name, last_update)
                      VALUES ('${body.first_name}', '${body.last_name}', '${lastUpdate}')
                      RETURNING last_update`;
    pgclient.connect()
      .then((client) => {
        return pgquery.queryDatabase(client, queryCmd);
      })
      .then((res) => {
        res.client.release(true);
        callback(null, lambdaResponse(res.data.rows[0]));
      })
      .catch((err) => {
        callback(null, {
          statusCode: 404,
          body: JSON.stringify(err)
        });
      });
  } else {
    const err = {
      error: 'Empty first name or last name'
    };
    callback(null, {
      statusCode: 400,
      body: JSON.stringify(err)
    });
  }
};

module.exports.updateActor = (event, context, callback) => {
  const body = JSON.parse(event.body);
  if (body.first_name || body.last_name) {
    const selQuery = `SELECT actor_id, first_name, last_name
                      FROM prototype.actor
                      WHERE actor_id = ${event.pathParameters.id}`;
    pgclient.connect()
      .then((client) => {
        return pgquery.queryDatabase(client, selQuery);
      })
      .then((res) => {
        if (!JSON.stringify(res.data.rows[0])) {
          return Promise.reject({
            client: res.client,
            error: 'Actor not found',
            code: 200
          });
        }
        return Promise.resolve({
          actor: JSON.parse(JSON.stringify(res.data.rows[0])),
          client: res.client
        });
      })
      .then((res) => {
        const actor = res.actor;
        const firstName = body.first_name ? body.first_name : actor.first_name;
        const lastName = body.last_name ? body.last_name : actor.last_name;
        const lastUpdate = moment().format(timeformat);
        const updateQuery = `UPDATE prototype.actor
                             SET first_name = '${firstName}',
                              last_name = '${lastName}',
                              last_update = '${lastUpdate}'
                             WHERE actor_id = ${actor.actor_id}
                             RETURNING last_update`;
        return pgquery.queryDatabase(res.client, updateQuery);
      })
      .then((res) => {
        res.client.release(true);
        callback(null, lambdaResponse(res.data.rows[0]));
      })
      .catch((err) => {
        if (err.client) {
          err.client.release(true);
          delete err.client;
        }
        callback(null, {
          statusCode: (err.code ? err.code : 400),
          body: JSON.stringify(err)
        });
      });
  } else {
    callback(null, lambdaResponse({
      message: 'No update for this actor'
    }));
  }
};

module.exports.deleteActor = (event, context, callback) => {
  const delQuery = `DELETE FROM prototype.actor
                    WHERE actor_id = ${event.pathParameters.id}
                    RETURNING last_update`;
  const selQuery = `SELECT actor_id
                    FROM prototype.actor
                    WHERE actor_id = ${event.pathParameters.id}`;
  pgclient.connect()
    .then((client) => {
      return pgquery.queryDatabase(client, selQuery);
    })
    .then((res) => {
      if (!JSON.stringify(res.data.rows[0])) {
        return Promise.reject({
          client: res.client,
          error: 'Actor not found',
          code: 200
        });
      }
      return pgquery.queryDatabase(res.client, delQuery);
    })
    .then((res) => {
      res.client.release(true);
      callback(null, lambdaResponse(res.data.rows[0]));
    })
    .catch((err) => {
      if (err.client) {
        err.client.release(true);
        delete err.client;
      }
      callback(null, {
        statusCode: (err.code ? err.code : 400),
        body: JSON.stringify(err)
      });
    });
};
