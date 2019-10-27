// Require modules/models using require keyword of Express
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Comment = require('../Models/Comment');
const DescriptionHistory = require('../Models/DescriptionHistory');
const checkAuthorization = require('./middlewares/check-auth');
/******************************         API CALLS        ************************************/

//[start] Gets all comments
router.get('/', async (req, res) => {
    try {
        var comments = await Comment.find().populate('replies');
        if (comments.length > 0) {
            res.json(comments);
        } else {
            // 404 - No comment found in database
            res.status(404).json({ msg: `No comments found!` });
        }
    } catch (error) {
        // 500 - System unable to find comments maybe due to Databse server not up
        res.status(500).json({ msg: error.msg });
    }
});
//[end] Gets all comments


//[start] Adds a new comment
router.post('/' , checkAuthorization ,async (req, res, next) => {
    try {
        //console.log('req.body =>' , req.body);
        console.log(req.body);
        var newComment = new Comment(req.body);
        //console.log('newComment => ' , newComment);

        const savedData = await newComment.save();
        console.log(savedData);
        res.json(savedData);

    } catch (error) {
        console.log(error);
        // 400 -  User sent in wrong input maybe property name in req.body is wrong, maybe datatype of value in req.body is wrong
        res.status(400).json({ msg: error });
    }
});
//[end] Adds a new comment


//[start] When edit is clicked ,this function is used
router.patch('/:commentId', checkAuthorization , async (req, res, next) => {
    try {
        const oldComment = await Comment.find({ _id: req.params.commentId });
        console.log('oldComment', oldComment);

        const oldDescription = new DescriptionHistory({
            desc: oldComment.description,
            source_id: req.params.commentId,
            onModel: 'Comment'
        });
        console.log('oldDescription', oldDescription);

        const savedData = await oldDescription.save();
        console.log('savedData', savedData);

        const updatedData = await Comment.updateOne(
            {
                _id: req.params.commentId
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
            res.status(404).json({ msg: `Cannot Edit comment as comment with ${id} does not exist!` });
        }
    }
    catch (error) {
        res.status(400).json({ msg: error.msg });
    }
});
//[end] When edit is clicked ,this function is used



//[start] When delete comment is called, then this function is called.
router.delete('/:id', checkAuthorization ,async (req, res) => {
    try {
        const id = req.params.id.toString();
        const delComment = await Comment.deleteOne({ _id: id });
        if (delComment.deletedCount != 0) {
            res.json(delComment);
        } else {
            // 404 - No comment found in database
            res.status(404).json({ msg: `Cannot delete comment as comment with ${id} does not exist!` });
        }
    } catch (error) {
        // 500 - System unable to find comments maybe due to Databse server not up
        res.status(500).json({ msg: error.msg });
    }
});
//[end] When delete comment is called, then this function is called.


//[start] This function increments upvote/downvote by checking propertyName passed through HttpParameters().
router.patch('/incrementVote/:commentId', checkAuthorization ,async (req, res, next) => {
    try {
        const propertyName = req.query.propertyName;
        // console.log('commentId' , req.params.commentId);
        // console.log('propertyName' , propertyName);
        if (propertyName === 'upvote') {
             updatedData = await Comment.updateOne(
                {
                    _id: req.params.commentId
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
             updatedData = await Comment.updateOne(
                {
                    _id: req.params.commentId
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
//[end] 


module.exports = router;