const mongoose = require('mongoose');

// Child #1 Schema
const DescriptionSchema = mongoose.Schema({
    desc: {
        type: String
    },
    editDate: {
        type: Date,
        default: Date.now
    }
});

// Child #2 Schema
const repliesSchema = mongoose.Schema({
    userName: {
        type: String
    },
    userImage: {
        type: String,
    },
    description: {
        type: [DescriptionSchema],
        default: []
    },
    upvote : {
        type : Number,
        default : 0
    },
    downvote : {
        type : Number,
        default : 0
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});


// Parent Schema
const commentSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userImage: {
        type: String
    },
    description: {
        type: [DescriptionSchema],
        default: []
    },
    upvote : {
        type : Number,
        default : 0
    },
    downvote : {
        type : Number,
        default : 0
    },
    replies: {
        type: [repliesSchema],
        default: []
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
});


module.exports = mongoose.model('Comment', commentSchema);