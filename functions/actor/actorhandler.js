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
