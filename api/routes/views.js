'use strict'

const express = require('express');
const ViewsController = require('../controllers/views');

let api = express.Router();

api.get('/', ViewsController.renderIndex);

module.exports = api;