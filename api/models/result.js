'use strict'

const mongoose = require('mongoose');

/**
 * @swagger
 * definitions:
 *  Result:
 *      type: object
 *      required:
 *          - wapixId
 *          - date
 *      properties:
 *          wapixId:
 *              type:string
 *          date:
 *              type:date
 *          result:
 *              type:array
 *      xml:
 *          name: User
 */
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