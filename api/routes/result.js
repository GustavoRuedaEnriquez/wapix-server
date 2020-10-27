'use strict'

const express = require('express');

const mdAuth = require('../middlewares/authenticate');

const ResultController = require('../controllers/result');

let api = express.Router();

api.post('/result', ResultController.createResult);
api.get('/result/:_id', mdAuth.ensureAuth, ResultController.readResult);
api.get('/result/wapixId/:wapixId', mdAuth.ensureAuth, ResultController.readResultByWapixId)
api.patch('/result/:_id', mdAuth.ensureAuth, ResultController.updateResult);
api.delete('/result/:_id', mdAuth.ensureAuth, ResultController.deleteResultById);

module.exports = api;