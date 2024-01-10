const express = require('express');
const router = express.Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  createThoughtReaction,
  deleteThoughtReaction,
} = require('../../controllers/thoughtController');

// Routes for /api/thoughts
router.route('/')
  .get(getThoughts)
  .post(createThought);

// Routes for /api/thoughts/:thoughtId
router.route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// Routes for /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
  .post(createThoughtReaction);

// Routes for /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
  .delete(deleteThoughtReaction);

module.exports = router;