const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trimmed: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,

    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'thought'
    }],

    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
})

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})

const User = model('user', userSchema);

module.exports = User