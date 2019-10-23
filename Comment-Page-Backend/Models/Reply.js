const mongoose = require('mongoose');

const ReplySchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userImage: {
        type: String
    },
    description: {
        type: String,
        required : true,
    },
    upvote : {
        type : Number,
        default : 0
    },
    downvote : {
        type : Number,
        default : 0
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Reply'
    }],
    creationDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Reply', ReplySchema);