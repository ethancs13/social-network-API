const { Schema, model } = require('mongoose');
const ReactionSchema = require('./Reaction');

// Define thought schema
const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [ReactionSchema], // Use singular for consistency
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

// Define virtual to retrieve the length of the reactions array
ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length.toString(); // Return as string for consistency
});

// Create and export the Thought model
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;