'use strict'

const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

/* load routes */
const userRoutes = require('./routes/user');

/* use cors */
app.use(cors());

/* body-parser middleware */
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

/* base routes */
app.use('/api',userRoutes);

module.exports = app;