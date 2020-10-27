'use strict'

const cors = require('cors');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');


const app = express();

/* css */
app.use('/public', express.static(path.join(__dirname, 'assets')));

/* load routes */
const userRoutes = require('./routes/user');
const resultRoutes = require('./routes/result');
const viewsRoutes = require('./routes/views');

/* use cors */
app.use(cors());

/* body-parser middleware */
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

/* base routes */
app.use('/api',userRoutes);
app.use('/api',resultRoutes);
app.use('/',viewsRoutes);

/* handlebars */
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', 'api/views');

module.exports = app;