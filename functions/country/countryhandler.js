const Country = require('../../models').Country;

module.exports.getAllCountries = (event, context, callback) => {
  Country.findAll()
    .then((countries) => {
      const response = {
        statusCode: 200,
        body: JSON.stringify(countries)
      };
      callback(null, response);
    })
    .catch((exp) => {
      callback(exp);
    });
};

module.exports.getCountryById = (event, context, callback) => {
  Country.findById(event.id)
    .then((country) => {
      const response = {
        statusCode: 200,
        body: JSON.stringify(country)
      };
      callback(null, response);
    })
    .catch((exp) => {
      callback(exp);
    });
};
