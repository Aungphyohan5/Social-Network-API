const { objectId } = require('mongoose').Types;
const { User, Thought } = require('../models')

module.exports = {
    allThoughts(req, res) {
        Thought.find({})
            .then((result) => res.json(result))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    getThoughtById(req, res) {
        Thought.findOne(req.params.userId)
            .select('-__v')
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with this id!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    createThought(req, res) {
        Thought.create(req.body)
            .then((newThought) => {
                return Thought.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { newThought: newThought._id } },
                    { new: true }
                );
            })
            .then((user) =>
                !user
                    ? res.status(404).json({
                        message: 'Thought created, but found no user with that ID',
                    })
                    : res.json('Created the Thought 🎉')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    updateThought(req, res) {
        Thought.findByIdAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true },
            (err, result) => {
                if (result) {
                    res.status(200).json(result);
                    console.log(`Updated: ${result}`);
                } else {
                    console.log('No thought with this id!');
                    res.status(500).json({ message: 'No thought with this id!' });
                }
            }
        )
    },

    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No video with this id!' })
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } },
                        { new: true }
                    )
            )
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: 'thought created but no user with this id!' })
                    : res.json({ message: 'thought successfully deleted!' })
            )
            .catch((err) => res.status(500).json(err));
    },
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

}
