'use strict'

const express = require('express');

const mdAuth = require('../middlewares/authenticate');

const UserController = require('../controllers/user');

let api = express.Router();

api.post('/user', UserController.createUser);
api.get('/user/:email', mdAuth.ensureAuth, UserController.readUser);
api.patch('/user/:email', mdAuth.ensureAuth, UserController.updateUser);
api.delete('/user/:email', mdAuth.ensureAuth, UserController.deleteUser);
api.post('/login', UserController.login)

module.exports = api;