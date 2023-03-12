const mongoose = require('mongoose')

const reactionSchema = require('./Reaction')

const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: timeStamp => dateFormat(timeStamp)
    },

    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],


}, {
    toJSON: {
        getters: true,
        virtuals: true
    },
});


thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})


function dateFormat(timeStamp) {
    return new Date(timeStamp).toLocaleDateString();
}

const Thought = ('thought', thoughtSchema)

module.exports = Thought;