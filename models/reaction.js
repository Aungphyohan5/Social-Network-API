const mongoose = require('mongoose')

const reactionSchema = new mongoose({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
    }
}, {

    toJSON: { getters: true }

})
function dateFormat(timestamp) {
    return new Date(timestamp).toLocaleDateString();
}

const Reaction = mongoose.model('reaction', reactionSchema);


module.exports = Reaction;
