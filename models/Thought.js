// Imports Schema and model functions from mongoose
const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// New schema for thoughtsSchema
const thoughtSchema = new Schema(
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
    // Array of nested/subdocuments documents from reactionSchema in Reaction.js.
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      // Virtuals are properties not stored in MongoDB, used for computed properties.
      // Virtuals aren't included in JSON by default so have to set to true.
      virtuals: true,
      // Getters let you format/manipulate data for use
      // Getters also aren't included by default so have to set to true.
      getters: true,
    },
  }
);

// Virtual that retrieves length of specific user reactions array
thoughtSchema.virtual('reactionCount').get(function () {
  return `${this.reactions.length}`;
});

// Initializes thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;