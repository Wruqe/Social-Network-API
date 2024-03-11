const { User, Thought } = require('../models');

module.exports = {
  // Get all THoughts
  async getThoughts(req, res) {
    try {
      const thought = await Thought.find()
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a course
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findByIdAndUpdate(req.body.userId,
       {
        $addToSet:{
          thoughts: thought._id
        }
       },
       {
        new: true,
       }
        )
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a course
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        res.status(404).json({ message: 'No thought with that ID' });
      }

      // await User.deleteMany({ _id: { $in: thought.users } });
      res.json({ message: 'thought deleted' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a Thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async addReaction(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.thoughtId,
       {
        $addToSet:{
          reactions: req.body
        }
       },
       {
        new: true,
       }
        )
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  async delReaction(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.thoughtId,
       {
        $pull:{
          reactions:{
            reactionId: req.params.reactionId
          }
        }
       },
       {
        new: true,
       }
        )
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
};
