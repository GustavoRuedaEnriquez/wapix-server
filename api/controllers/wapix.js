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

module.exports = {
    createWapix
}