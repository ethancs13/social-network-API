// Imports express library, sets up connection to database, and imports db routes
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Sets port and creates an instance of express
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware to parse URL-encoded requests and JSON formatting
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Allows the use of routes that were imported above
app.use(routes);

// Event listener for the request of a specific port when the database is connected
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
