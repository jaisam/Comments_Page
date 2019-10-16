const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Comment = require('../Models/Comment');

module.exports = router;

router.get('/', async (req,res,next) => {
    try {
        console.log('before');
        var comments = await Comment.find().sort({ createdDate : 1 });
        console.log('after');
        if (comments.length > 0 ) {
            res.json(comments);
        } else {
            res.json({ msg : `No comments found!`});
        }
    } catch (error) {
        res.status(400).json({ msg : error.msg });
        }
});

router.post('/', async (req,res,next) => {
    try {
        console.log('req.body =>' , req.body);

        var newComment = new Comment(req.body);
        console.log('newComment => ' , newComment);

        const savedData = await newComment.save();
        res.json(savedData);

    } catch(error) {
        res.status(400).json({ msg : error});
    }
})