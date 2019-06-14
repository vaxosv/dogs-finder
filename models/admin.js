const mongoose = require('mongoose');
const path = require('path');

// User Schema
const AdminSchema = mongoose.Schema({
    username:  {
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    }
});

const admin = module.exports = mongoose.model('admin', AdminSchema);