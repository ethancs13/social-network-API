const { connect, connection } = require('mongoose');

// Creates a connection to the socialMediaDB database using the default MongoDB port (27017).
connect('mongodb://127.0.0.1:27017/socialMediaDB')
  .then(() => {
    console.log(`Database is connected.`);
  })
  .catch((error) => {
    console.error(`Connection has failed. Reason: ${error}`);
  });

module.exports = connection;