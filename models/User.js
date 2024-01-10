const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { randomUsers, randomThoughts } = require('../utils/data');

connection.on('error', (err) => console.error('Connection error:', err));

// Event listener for successful connection
connection.once('open', async () => {
  console.log('Connected to the database.');

  try {
    // Drop 'users' and 'thoughts' collections if they already exist
    await Promise.all([
      User.collection.drop(),
      Thought.collection.drop()
    ]);

    // Generate random users and thoughts
    const users = randomUsers(8);
    const thoughts = randomThoughts(8);

    // Insert generated data into 'users' and 'thoughts' collections
    await Promise.all([
      User.collection.insertMany(users),
      Thought.collection.insertMany(thoughts)
    ]);

    console.log('Data inserted successfully.');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    // Close the connection after the operation
    connection.close();
  }
});