// Require modules using require keyword of Express
const mongoose = require('mongoose');

// Child #1 Schema
const repliesSchema = mongoose.Schema({
    userName: {
        type: String
    },
    userImage: {
        type: String,
    },
    description: {
        type: String
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

// Child #2 Schema
const editedDescriptionSchema = mongoose.Schema({
    Description: {
        type: String
    },
    editedDate: {
        type: Date,
        default: Date.now
    }
})

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
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    replies: {
        type: [repliesSchema],
        default: []
    },
    editedDescription: {
        type: [editedDescriptionSchema],
        default: []
    }
});


module.exports = mongoose.model('Comment', commentSchema);