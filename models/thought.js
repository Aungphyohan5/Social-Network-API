const mongoose = require('mongoose')

const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        min: 1,
        max: 280,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],


}, {
    toJSON: { getters: true }
});


thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

thoughtSchema.virtual('createdAtFormatted').get(function () {
    return this.createdAt.toLocaleString();
})

const Thought = ('thought', thoughtSchema)

module.exports = Thought;