const { Schema, model } = require('mongoose');

// User Schema
const userSchema = new Schema(
  {
    // User details
    username: {
      type: String,
      unique: true,
      required: true,
      // Trims whitespace from start and end of string before storing in the database.
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // Email address validation
      match: [/.+\@.+\..+/, 'Email address is not valid.'],
    },
    // Relationships
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
    // Schema options
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Virtual property to retrieve the length of the user's friends array
userSchema.virtual('friendCount').get(function calculateFriendCount() {
  return this.friends.length;
});

// User Model
const User = model('user', userSchema);

module.exports = User;
