const pckg = require('../../package.json');


module.exports.getHealth = (event, context, callback) => {
  const response = {
    probe: pckg.version,
    status: 'ok'
  };

  callback(null, response);
};
