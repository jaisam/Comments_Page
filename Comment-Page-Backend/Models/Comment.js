const mongoose = require('mongoose');

const repliesSchema =mongoose.Schema({
    userName : {
        type : String
    },
    userImage : {
        type : String,
    },
    description : {
        type : String
    }
});

const editedDescriptionSchema = mongoose.Schema({
    editedDescription : {
        type : String
    },
    editedDate : {
        type : Date,
        default : Date.now
    }
})

const commentSchema = mongoose.Schema({
    userName : {
        type : String,
        required : true
    },
    userImage : {
        type : String
    },
    description : {
        type : String,
        required : true
    },
    createdDate : {
        type : Date,
        default : Date.now
    },
    replies : {
        type : [repliesSchema],
        default : []
    },
    editedDescription : {
        type : [editedDescriptionSchema],
        default : []
    }
});


module.exports = mongoose.model( 'Comment' , commentSchema);