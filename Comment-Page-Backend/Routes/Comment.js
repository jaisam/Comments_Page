// Require modules/models using require keyword of Express
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Comment = require('../Models/Comment');


/******************************         API CALLS        ************************************/

//[start] Gets all comments
router.get('/', async (req, res) => {
    try {
        var comments = await Comment.find().sort({ createdDate: 1 });
        if (comments.length > 0) {
            res.json(comments);
        } else {
            res.json({ msg: `No comments found!` });
        }
    } catch (error) {
        res.status(400).json({ msg: error.msg });
    }
});
//[end] Gets all comments


//[start] Adds a new comment
router.post('/', async (req, res) => {
    try {
        //console.log('req.body =>' , req.body);

        var newComment = new Comment(req.body);
        //console.log('newComment => ' , newComment);

        const savedData = await newComment.save()
        console.log(savedData);
        res.json(savedData);

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: error });
    }
});
//[end] Adds a new comment


//[start] When edit is clicked, this function is called and adds modified comment into editedDescription array so as to maintain history of edits
router.patch('/edit/:id', async (req, res) => {
    try {
        var id = req.params.id.toString();
        console.log(id);
        let edit = {};

        // Creating dynamic object to be used in update query 
        edit['Description'] = req.body.editedDescription.Description;
        edit['_id'] = mongoose.Types.ObjectId();
        edit['editedDate'] = new Date().toISOString();

        console.log(edit);
        const updDescription = await Comment.updateOne(
            { _id: id },
            {
                $push: {
                    editedDescription: edit
                }
            }
        );

        if (updDescription.n != 0) {
            res.json(updDescription);
        } else {
            res.json({ msg: `Cannot Edit comment` });
        }

    } catch (error) {
        res.status(400).json({ msg: error.msg });
    }
});
//[end] When edit is clicked, this function is called and adds modified comment into editedDescription array so as to maintain history of edits


//[start] When reply is clicked, this function is called and adds new reply into replies array.
router.patch('/reply/:id', async (req, res) => {
    try {
        var id = req.params.id.toString();
        //console.log(id);
        let reply = {};

        // Creating dynamic object to be used in update query
        reply['_id'] = mongoose.Types.ObjectId();
        reply['userName'] = req.body.replies.userName;
        reply['userImage'] = req.body.replies.userImage;
        reply['description'] = req.body.replies.description;
        reply['createdDate'] = new Date().toISOString();

        console.log(reply);
        const updReply = await Comment.updateOne(
            { _id: id },
            {
                $push: {
                    replies: reply
                }
            }
        );
        if (updReply.n != 0) {
            res.json(updReply);
        } else {
            res.json({ msg: `Cannot Add Reply` });
        }
    } catch (error) {
        res.status(400).json({ msg: error.msg });
    }
});
//[end] When reply is clicked, this function is called and adds new reply into replies array.


//[start] When delete comment is called, then this function is called.
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id.toString();
        const delComment = await Comment.deleteOne({ _id: id });
        if (delComment.n != 0) {
            res.json(delComment);
        } else {
            res.json({ msg: `Cannot delete comment ` });
        }
    } catch (error) {
        res.status(400).json({ msg: error.msg });
    }
});
//[end] When delete comment is called, then this function is called.


//[start] When delete reply is called, this function is called. Patch is used because, replies to comment are stored as array of objects in same User.
router.patch('/:userId&:replyId', async (req, res) => {
    try {
        const user_id = req.params.userId.toString();
        const reply_id = req.params.replyId.toString();
        console.log('User id : ', user_id, '  |  Reply id : ', reply_id);

        const deleteReply = await Comment.update(
            { _id: user_id },
            {
                $pull: {
                    replies: {
                        _id: reply_id
                    }
                }
            },
            {
                safe: true,
                multi: true
            }
        );
        if (deleteReply.n != 0) {
            res.json(deleteReply);
        } else {
            res.json(`Cannot delete reply`);
        }
    } catch (error) {
        res.status(400).json({ msg: error.msg });
    }
});
//[end] When delete reply is called, this function is called. Patch is used because, replies are stored as array of objects in same comment document.

module.exports = router;