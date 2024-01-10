const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      // Trims whitespace from start and end
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // '.' matches any character except space, '+' matches one or more of previous element, '\@' matches '@' character (use backslash to escape special characters).
      // '\.' matches a '.', '.+' matches one or more of any character.
      // Must have one or more of any character before the '@', one or more characters after the '@' and before the '.', and one or more characters after the '.'
      match: [/.+\@.+\..+/, 'Email address is not valid.'],
    },
    thoughts: [
      {
        // References id values from thought model
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    friends: [
      {
        // self-reference for id values from user model
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

// Virtual that retrieves length of specific user friends array
userSchema.virtual('friendCount').get(function () {
  return `${this.friends.length}`;
});

const User = model('user', userSchema);

module.exports = User;