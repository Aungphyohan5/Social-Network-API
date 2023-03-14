const { objectId } = require('mongoose').Types;
const { User, Thought } = require('../models')

module.exports = {
    //Get all Users
    allUsers: async (req, res) => {
        try {
            const users = await User.find().populate('thoughts').populate('friends');
            res.status(200).json(users);
            console.log(`all users`)
        } catch (e) {
            res.status(500).json(e.message);
        }
    },
    //Get single User
    getSingleUser(req, res) {
        User.findById(req.params.userId).populate('thoughts').populate('friends')
            .select('-__v')
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    //create a user
    createUser(req, res) {
        User.create(req.body)
            .then((newUser) => res.json(newUser))
            .catch((e) => res.status(500).json(e));
    },

    //Update a user
    updateUser(req, res) {
        User.findByIdAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { new: true },
            (err, result) => {
                if (result) {
                    res.status(200).json(result);
                    console.log(`Updated: ${result}`);
                } else {
                    console.log('Uh Oh, something went wrong');
                    res.status(500).json({ message: 'something went wrong' });
                }
            }
        )
    },
    //Delete a user
    deleteUser(req, res) {
        User.findByIdAndDelete(req.params.userId)
            .then((deletedUser) => res.json(deletedUser))
            .catch((err) => res.status(500).json(err));
    },
    //Add friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No User find with this ID!" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err))
    },
    // Delete friend
    deleteFriend(req, res) {
        User.findOneAndDelete(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
            .then(
                (user) =>
                    !user
                        ? res.status(404).json({ message: "No User find with this ID!" })
                        : res.json(user)
            )
            .catch((err) => res.status(500).json(err));

    }

}