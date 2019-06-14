const mongoose = require('mongoose');
const path = require('path');

// User Schema
const PostSchema = mongoose.Schema({
    title:  {
      type: String,
      require: true
    },
    url: String,
    date: { type: Date, default: Date.now },
});

const Post = module.exports = mongoose.model('posts', PostSchema);