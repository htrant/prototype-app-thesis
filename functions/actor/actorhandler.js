const Actor = require('../../models').Actor;

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
  // thisSession.hasOwnProperty('merchant_id')
  // var y = (x == 2 ? "yes" : "no");
  Actor.findById(event.id)
    .then((actor) => {
      actor.first_name = event.first_name !== undefined ? event.first_name : actor.first_name;
      actor.last_name = event.last_name !== undefined ? event.last_name : actor.last_name;
      console.log(actor, null, 2);
    })
    .catch((exp) => {
      callback(exp);
    });
};
