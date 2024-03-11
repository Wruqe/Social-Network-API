const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const user = await User.find()
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body); 
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a User
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        res.status(404).json({ message: 'No user with that ID' });
      }
      res.json({ message: 'User deleted' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a User
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        {
            $set: req.body
        },
        {
            new: true
        }
      );

      if (!user) {
        res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },


async addFriend (req,res) {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId, {
                $addToSet: {
                    friends: req.params.friendId
                }
            },
            {
                new: true
            }
        )
        res.json(user)
    } catch (err) {
        res.status(500).json(err)
    }
},
async delFriend (req,res) {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId, {
                $pull: {
                    friends: req.params.friendId
                }
            },
            {
                new: true
            }
        )
        res.json(user)
    } catch (err) {
        res.status(500).json(err)
    }
}

};
