const Actor = require('../../models').Actor;

module.exports.getAllActors = (event, context, callback) => {
  Actor.fidnAll()
    .then((actors) => {
      const response = {
        statusCode: 200,
        body: JSON.stringify(actors)
      };
      callback(null, response);
    })
    .catch((exp) => {
      callback(exp);
    });
};
