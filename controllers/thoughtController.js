const { Thought } = require('../models/Thought');

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      console.error('Error fetching thoughts:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'Thought not found.' });
      }

      res.json(thought);
    } catch (err) {
      console.error('Error fetching single thought:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      console.error('Error creating thought:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res.status(404).json({ message: 'Thought not found.' });
      }

      res.json(thought);
    } catch (err) {
      console.error('Error deleting thought:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'Thought not found.' });
      }

      res.json(thought);
    } catch (err) {
      console.error('Error updating thought:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async createThoughtReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!reaction) {
        return res.status(404).json({ message: 'Thought not found.' });
      }

      res.json(reaction);
    } catch (err) {
      console.error('Error creating thought reaction:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async deleteThoughtReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndDelete(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!reaction) {
        return res.status(404).json({ message: 'Thought not found.' });
      }

      res.json(reaction);
    } catch (err) {
      console.error('Error deleting thought reaction:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};
