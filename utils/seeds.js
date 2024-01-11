const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { randomUsers, randomThoughts } = require('./data');

// Event listener for errors that occur with connection.
connection.on('error', (err) => console.error(err));

// Define an async function for database setup
const setupDatabase = async () => {
  try {
    // Check and drop users collection if it already exists
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
      await connection.dropCollection('users');
    }

    // Check and drop thoughts collection if it already exists
    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
      await connection.dropCollection('thoughts');
    }

    // Generate random users and thoughts
    const users = randomUsers(5);
    const thoughts = randomThoughts(5);

    // Insert generated data into users and thoughts collections
    try {
      await User.collection.insertMany(users, { ordered: false }); // Set ordered to false
    } catch (error) {
      // Handle duplicate key errors or other write errors
      if (error.code === 11000) {
        console.error('Duplicate key error:', error.message);
      } else {
        console.error('Other write error:', error.message);
      }
    }

    try {
      await User.collection.insertMany(thoughts, { ordered: false }); // Set ordered to false
    } catch (error) {
      // Handle duplicate key errors or other write errors
      if (error.code === 11000) {
        console.error('Duplicate key error:', error.message);
      } else {
        console.error('Other write error:', error.message);
      }
    }


    // Console log the tables
    console.table(users);
    console.table(thoughts);

    // Exit the process
    process.exit(0);
  } catch (err) {
    console.error(err);
  }
};

// Only listen for the 'open' event once, and then call the setup function
connection.once('open', setupDatabase);