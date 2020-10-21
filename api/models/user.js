'use strict'

const mongoose = require('mongoose');

let schema = mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    image : {
        type : String,
        default : ""
    }
});

module.exports = mongoose.model("User", schema);