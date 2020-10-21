'use strict'

const express = require('express');
const UserController = require('../controllers/user');

let api = express.Router();

api.post('/user', UserController.createUser);
api.get('/user/:email', UserController.readUser);
api.patch('/user/:email', UserController.updateUser);
api.delete('/user/:email', UserController.deleteUser)

module.exports = api;