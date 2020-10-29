'use strict'

const mongoose = require('mongoose');

/**
 * @swagger
 * definitions:
 *  Wapix:
 *      type: object
 *      required:
 *          - name
 *          - creator
 *          - lastUpdate
 *          - available
 *          - code
 *      properties:
 *          name:
 *              type:string
 *          creator:
 *              type:string
 *          version:
 *              type:number
 *          lastUpdate:
 *              type:date
 *          available:
 *              type:boolean
 *          code:
 *              type:string
 *          questions:
 *              type:array
 *      xml:
 *          name: User
 */
let schema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    creator : {
        type : String,
        required : true
    },
    version : {
        type : Number,
        default : 1
    },
    lastUpdate : {
        type : Date,
        required : true
    },
    available: {
        type : Boolean,
        required : true,
        default : false
    },
    code : {
        type : String,
        required : true,
    },
    questions : {
        type : Array,
        default : []
    }
});

module.exports = mongoose.model("Wapix", schema);