'use strict'

const mongoose = require('mongoose');

let schema = mongoose.Schema({
    wapixId : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        required : true
    },
    result : {
        type : Array,
        default : []
    }
});

module.exports = mongoose.model("Result", schema);