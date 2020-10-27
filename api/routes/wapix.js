'use strict'

const express = require('express');

const mdAuth = require('../middlewares/authenticate');

const WapixController = require('../controllers/wapix');

let api = express.Router();

api.post('/wapix', WapixController.createWapix);
api.get('/wapix/:_id', mdAuth.ensureAuth, WapixController.readWapix);
api.patch('/wapix/:_id', mdAuth.ensureAuth, WapixController.updateWapix);
api.delete('/wapix/:_id', mdAuth.ensureAuth, WapixController.deleteWapixById);

module.exports = api;