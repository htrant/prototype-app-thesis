module.exports.queryDatabase = function (client, query) {
  return new Promise((resolve, reject) => {
    client.query(query)
      .then((res) => {
        resolve({
          client,
          data: res
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};
