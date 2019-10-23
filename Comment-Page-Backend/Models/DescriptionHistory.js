const mongoose = require('mongoose');
const Reply = require('./Reply');
const Comment = require('./Comment');

const DescriptionHistorySchema = mongoose.Schema({
    desc: {
        type: String
    },
    editDate: {
        type: Date,
        default: Date.now
    },
    source_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
      },
      onModel: {
        type: String,
        required: true,
        enum: ['Reply', 'Comment']
      }
});

module.exports = mongoose.model('DescriptionHistory', DescriptionHistorySchema);