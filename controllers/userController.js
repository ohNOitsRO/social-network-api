const { Users, Thought } = require('../models');

const userController = {

  getAllUsers(req, res) {
    Users.find({})
      .populate({
        path: 'friends',
        select: '-__v',
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then((userData) => res.json(userData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  getUserById({ params }, res) {
    Users.findOne({ _id: params.id })
      .populate({
        path: 'thought',
        select: '-__v',
      })
      .populate({
        path: 'friends',
        select: '-__v',
      })
      .select('-__v')
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'User not found!' });
        }

        res.json(userData);

      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  createUser({ body }, res) {
    Users.create(body)
      .then((userData) => res.json(userData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  updateUser({ params, body }, res) {
    Users.findOneAndUpdate(
      { _id: params.id },
      body,
      { new: true, runValidators: true, })
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'User not found!' });
        }

        res.json(userData);

      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  deleteUser({ params }, res) {
    Users.findOneAndDelete({ _id: params.id })
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'User not found!' });
        }

        return Thought.deleteMany({ _id: { $in: userData.thought } });
      })
      .then(() => {
        res.json({ message: 'User has been deleted!' });
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  addFriend({ params }, res) {
    Users.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'User not found!' });
        }

        res.json(userData);

      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  removeFriend({ params }, res) {
    Users.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: 'User not found!' });
        }

        res.json(userData);

      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },
};


module.exports = userController