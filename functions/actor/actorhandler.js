const Actor = require('../../models').Actor;
const moment = require('moment');

const lambdaResponse = (object) => {
  return {
    statusCode: 200,
    body: JSON.stringify(object)
  };
};

module.exports.getAllActors = (event, context, callback) => {
  Actor.findAll()
    .then((actors) => {
      callback(null, lambdaResponse(actors));
    })
    .catch((exp) => {
      callback(exp);
    });
};

module.exports.getActorById = (event, context, callback) => {
  Actor.findById(event.id)
    .then((actor) => {
      callback(null, lambdaResponse(actor));
    })
    .catch((exp) => {
      callback(exp);
    });
};

module.exports.createNewActor = (event, context, callback) => {
  Actor.max('actor_id')
    .then((id) => {
      const nextId = id + 1;
      return Actor.build({
        actor_id: nextId,
        first_name: event.first_name,
        last_name: event.last_name
      }).save();
    })
    .then((actor) => {
      callback(null, lambdaResponse(actor));
    })
    .catch((exp) => {
      callback(exp);
    });
};

module.exports.updateActor = (event, context, callback) => {
  Actor.findById(event.id)
    .then((actor) => {
      const actorData = {
        first_name: (event.first_name === undefined ? actor.first_name : event.first_name),
        last_name: (event.last_name === undefined ? actor.last_name : event.last_name),
        last_update: moment()
      };
      return Actor.update(actorData, {
        where: {
          actor_id: event.id
        },
        limit: 1
      });
    })
    .then((result) => {
      callback(null, lambdaResponse(result));
    })
    .catch((exp) => {
      callback(exp);
    });
};
