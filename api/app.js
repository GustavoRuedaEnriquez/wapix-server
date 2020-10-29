'use strict'

const cors = require('cors');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const app = express();

const swaggerOptions = {
    swaggerDefinition: {
        swagger: "2.0",
        info: {
            "title": "Wapix",
            "description": "This is Wapix working with swagger.",
            "termsOfService": "http://example.com/terms/",
            "contact": {
              "name": "Wapix Support"
            },
            "version": "1.0.0",
            "servers": ["http://localhost:3003"]
          },
    },
    apis: ['app.js', 'api/routes/user.js', 'api/routes/result.js', 'api/routes/wapix.js',
     'api/models/result.js', 'api/models/user.js', 'api/models/wapix.js']
}

/* swagger */
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/* css */
app.use('/public', express.static(path.join(__dirname, 'assets')));

/* load routes */
const userRoutes = require('./routes/user');
const wapixRoutes = require('./routes/wapix');
const resultRoutes = require('./routes/result');
const viewsRoutes = require('./routes/views');

/* use cors */
app.use(cors());

/* body-parser middleware */
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

/* base routes */
app.use('/api',userRoutes);
app.use('/api',wapixRoutes);
app.use('/api',resultRoutes);
app.use('/',viewsRoutes);

/* handlebars */
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', 'api/views');

module.exports = app;