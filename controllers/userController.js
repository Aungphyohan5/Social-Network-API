const { objectId } = require('mongoose').Types;
const { User, Thought } = require('../models')

module.exports = {
    allUsers: async (req, res) => {
        try {
            const users = await User.find().populate('thoughts').populate('friends');
            res.status(200).json(users);
        } catch (e) {
            res.status(500).json(e.message);
        }
    },

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

    createUser(req, res) {
        User.create(req.body)
            .then((newUser) => res.json(newUser))
            .catch((e) => res.status(500).json(e));
    },

    UpdateUser(req, res) {
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

    DeleteUser(req, res) {
        User.findByIdAndDelete(req.params.userId)
            .then((deletedUser) => res.json(deletedUser))
            .catch((err) => res.status(500).json(err));
    }

}