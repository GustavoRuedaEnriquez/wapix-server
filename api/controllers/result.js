'use strict'

const  moment = require('moment');
const jwt = require('../utils/jwt');

const Result = require('../models/result');

function createResult(req, res) {
    let result = new Result();
    let body  = req.body;

    result.wapixId = body.wapixId;
    result.date = moment().toDate();
    result.results = (body.results == undefined) ? [] :  body.results;
    result.playersJoined = (body.playersJoined == undefined) ? [] :  body.playersJoined;

    let errorMessage = 'The following fields are required: '
    let error = false;

    if(result.wapixId == undefined) {
        error = true;
        errorMessage += 'wapix id '
    }
  
    if(error) {
        res.status(400).send({ message : `${errorMessage}` });
    } else {
        result.save((err, storedResult) => {
            if(err){
                res.status(500).send({ mesage :  `${err}` });
            } else {
                if(!storedResult){
                    res.status(404).send({ message : 'Error while saving result.' });
                } else {
                    res.status(201).send({ message : 'Result created successfully.', result : storedResult });
                }
            }
        });
    }
}

function readResult(req,res){
    let resultId  = req.params._id;
    Result.find({_id: resultId},(err,result) => {
        if(err){
            res.status(500).send({ message: `${err}` });
        }else{
            if(Object.entries(result).length === 0){
                res.status(404).send({ message : 'Result not found.' });
            }else{
                res.status(200).send({ message : 'Result obtained', result : result});
            }
        }
    });
}

function readResultByWapixId(req,res){
    let wapixId  = req.params.wapixId;
    Result.find({ wapixId : wapixId },(err, results) => {
        if(err) {
            res.status(500).send({ message: `${err}` });
        } else {
            res.status(200).send({ message : 'results obtained', result : results});
        }
    });
}

function updateResult(req, res) {
    let resultId = req.params._id;
    let body = req.body;
    let update = {};

    if(body.result != undefined) {
        update.result = body.result;
    }

    Result.findOneAndUpdate({ _id : resultId }, update, { new : true, useFindAndModify : false}, (err,updatedResult) =>{
        if(err){
            res.status(500).send({ message: `${err}` });
        }else{
            if(!updatedResult){
                res.status(404).send({ message : 'Could not update the result\'s data.' });
            }else{
                res.status(200).send({ message :'Result\'s data updated.', result : updatedResult })
            }
        }
    });
}

function deleteResultById(req, res) {
    let resultId = req.params._id;
    Result.deleteOne({ _id : resultId}, (err) => {
        if(err) {
            res.status(500).send({ message: `${err}` });
        } else {
            res.status(200).send({ message : 'Result deleted.' });
        }
    });
}


module.exports = {
    createResult,
    readResult,
    readResultByWapixId,
    updateResult,
    deleteResultById
}