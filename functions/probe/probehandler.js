const pckg = require('../../package.json');

module.exports.getHealth = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      probe: pckg.version,
      status: 'ok'
    })
  };

  callback(null, response);
};
