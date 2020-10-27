'use strict'

const express = require('express');

const WapixController = require('../controllers/wapix');

let api = express.Router();

api.post('/wapix', WapixController.createWapix);

module.exports = api;