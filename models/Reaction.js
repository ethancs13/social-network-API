const { Schema, Types } = require('mongoose');

// Define reaction schema
const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Types.ObjectId, // Use the imported Types for consistency
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

module.exports = ReactionSchema; // Use consistent naming for exported schema