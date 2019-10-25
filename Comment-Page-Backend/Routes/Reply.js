const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Reply = require('../Models/Reply');
const Comment = require('../Models/Comment');
const DescriptionHistory = require('../Models/DescriptionHistory');



router.post('/', async (req, res, next) => {
    try {
        console.log('inside reply post');

        const reply = new Reply({
            userName: req.body.userName,
            userImage: req.body.userImage,
            description: req.body.description
        });
        const savedReply = await reply.save();
        console.log('savedReply', savedReply);

        const updatedComment = await Comment.updateOne(
            {
                _id: req.body.commentId
            },
            {
                $push: {
                    replies: savedReply._id
                }
            }
        );
        console.log('updatedComment', updatedComment);

        //check if true,then only send json
        res.json(savedReply);
    }
    catch (error) {
        res.status(400).json({ msg: error.msg });
    }
});

router.delete('/:commentId&:replyId', async (req, res, next) => {
    try {
        const deletedReply = await Reply.remove({ _id: req.params.replyId });
        console.log('Reply deleted', deletedReply);

        if (deletedReply.deletedCount != 0) {
            const updatedComment = await Comment.updateOne(
                {
                    _id: req.params.commentId
                },
                {
                    $pull: {
                        replies: req.params.replyId
                    }
                }
            );
            console.log('Comment updated', updatedComment);

            if (updatedComment.nModified == 1) {
                res.json({ msg: 'Reply deleted successfully' });
            }
            else {
                res.status(500).json({ msg: 'Internal error ' });
            }
        }
        else {
            res.status(404).json({ msg: 'Cannot delete reply as it does not exist' });
        }
    }
    catch (error) {
        res.status(500).json({ msg: error.msg });
    }
});


router.patch('/:replyId', async (req, res, next) => {
    try {
        //console.log('inside try');

        const oldReply = await Reply.find({ _id: req.params.replyId });
        console.log('oldReply', oldReply);

        const oldDescription = new DescriptionHistory({
            desc: oldReply.description,
            source_id: req.params.replyId,
            onModel: 'Reply'
        });
        console.log('oldDescription', oldDescription);

        const savedData = await oldDescription.save();
        console.log('savedData', savedData);

        const updatedData = await Reply.updateOne(
            {
                _id: req.params.replyId
            },
            {
                $set: {
                    description: req.body.description
                }
            }
        );
        console.log('updatedData', updatedData);

        if (updatedData.nModified == 1) {
            res.json(updatedData);
        } else {
            // 404 - No comment found in database
            res.status(404).json({ msg: `Cannot Edit reply as reply with ${id} does not exist!` });
        }
    }
    catch (error) {
        res.status(400).json({ msg: error.msg });
    }
});


router.patch('/incrementVote/:replyId', async (req, res, next) => {
    try {
        const propertyName = req.query.propertyName;
        console.log('commentId' , req.params.replyId);
        console.log('propertyName' , propertyName);
        if (propertyName === 'upvote') {
             updatedData = await Reply.updateOne(
                {
                    _id: req.params.replyId
                },
                {
                    $inc: {
                        upvote: 1
                    }
                }
            );
            // console.log('upvote updated data', updatedData);
        }
        else if (propertyName === 'downvote') {
             updatedData = await Reply.updateOne(
                {
                    _id: req.params.replyId
                },
                {
                    $inc: {
                        downvote: 1
                    }
                }
            );
            // console.log('downvote updated data', updatedData); 
        }
        if (updatedData.nModified != 0) {
            res.json(updatedData);
        }
        else {
            res.status(500).json({ msg: `${propertyName} increment failed` });
        }
    }
    catch (error) {
        res.status(400).json({ msg: error.msg });
    }
});


module.exports = router;