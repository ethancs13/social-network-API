const { Schema, Types } = require('mongoose');

// Schema that is used for reference for thoughtsSchema.
const reactionSchema = new Schema(
  {
    reactionId: {
      // Schema.Types is used to define data type.
      type: Schema.Types.ObjectId,
      // Sets default option to return a new ObjectId. Uses Types.ObjectId() since you need to call function to create and return new ObjectId.
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      // Sets default to current date timestamp
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;