const mongoose = require('mongoose');
const User = require('../models/User'); // Adjust the path based on your project structure

async function clearUserData() {
  try {
    await mongoose.connect('mongodb://localhost:27017/socialMediaDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await User.deleteMany({});
    console.log('All data cleared from the users collection.');
  } catch (error) {
    console.error('Error clearing data:', error.message);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
}

// Call the function to clear user data
clearUserData();
