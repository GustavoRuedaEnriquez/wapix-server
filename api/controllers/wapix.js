'use strict'

const moment = require('moment');

const Wapix = require('../models/wapix');

function createWapix(req, res) {
    let wapix = new Wapix();
    let body = req.body;

    wapix.name = body.name;
    wapix.creator = body.creator;
    wapix.version = (body.version == undefined) ? 1 :  body.version;
    wapix.lastUpdate = moment().toDate();
    wapix.available = (body.available == undefined) ? false :  body.available;
    wapix.code = Math.floor(100000 + Math.random() * 900000);
    wapix.questions = (body.questions == undefined) ? [] :  body.questions;

    let errorMessage = 'The following fields are required: '
    let error = false;

    if(wapix.name == undefined) {
        error = true;
        errorMessage += 'name '
    }
    if(wapix.creator == undefined) {
        error = true;
        errorMessage += 'creator '
    }

    if(error) {
        res.status(400).send({ message : `${errorMessage}` });
    } else {
        wapix.save((err, storedWapix) => {
            if(err) {
                res.status(500).send({ mesage :  `${err}` });
            } else {
                if(!storedWapix) {
                    res.status(404).send({ message : 'Error while saving wapix.' });
                } else {
                    res.status(201).send({ message : 'Wapix created successfully.', wapix : storedWapix });
                }
            }
        });
    }
}

function readWapix(req,res){
    let wapixId = req.params._id;
    Wapix.find({_id: wapixId},(err,wapix) => {
        if(err) {
            res.status(500).send({ message: `${err}` });
        } else {
            if(Object.entries(wapix).length === 0) {
                res.status(404).send({ message : 'Wapix not found.' });
            } else {
                res.status(200).send({ message : 'Wapix obtained', wapix : wapix});
            }
        }
    });
}

function readWapixesByEmail(req,res){
    let author = req.params.email;
    Wapix.find({ creator : author },(err, wapixes) => {
        if(err) {
            res.status(500).send({ message: `${err}` });
        } else {
            res.status(200).send({ message : 'Wapixes obtained', wapix : wapixes});
        }
    });
}

function readWapixQuestion(req,res){
    let wapixId = req.params['_id'];
    let number = req.params['number'];
    Wapix.find({_id: wapixId},(err,wapix) => {
        if(err) {
            res.status(500).send({ message: `${err}` });
        } else {
            if(Object.entries(wapix).length === 0) {
                res.status(404).send({ message : 'Question not found.' });
            } else {
                res.status(200).send( { message : 'Question obtained', question : wapix[0].questions[number-1], total :  wapix[0].questions.length });
            }
        }
    });
}

function updateWapix(req, res) {
    let wapixId = req.params._id;
    let body = req.body;
    let update = {};

    if(body.name != undefined) {
        update.name = body.name;
    }
    if(body.version != undefined) {
        update.version = body.version;
    }
    if(body.available != undefined) {
        update.available = body.available;
    }
    if(body.questions != undefined) {
        update.questions = body.questions;
    }

    update.lastUpdate = moment().toDate();

    Wapix.findOneAndUpdate({ _id : wapixId }, update, { new : true, useFindAndModify : false}, (err,updatedWapix) => {
        if(err) {
            res.status(500).send({ message : `${err}` });
        }else {
            if(!updatedWapix) {
                res.status(404).send({ message : 'Could not update the wapix\'s data.' });
            } else {
                res.status(200).send({ message :'Wapix\'s data updated.', wapix : updatedWapix })
            }
        }
    });
}

function deleteWapixById(req, res) {
    let wapixId = req.params._id;
    Wapix.deleteOne({ _id : wapixId}, (err) => {
        if(err) {
            res.status(500).send({ message: `${err}` });
        } else {
            res.status(200).send({ message : 'Wapix deleted.' });
        }
    });
}

module.exports = {
    createWapix,
    readWapix,
    readWapixesByEmail,
    readWapixQuestion,
    updateWapix,
    deleteWapixById
}