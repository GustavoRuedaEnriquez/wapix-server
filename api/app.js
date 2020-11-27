'use strict'

const cors = require('cors');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
var multer = require('multer');
var aws = require('aws-sdk');
var multerS3 = require('multer-s3');

var secretAccessKey = process.env.AWS_SECRET_KEY;
var accessKeyId = process.env.AWS_ACCESS_KEY;
var bucketName = process.env.BUCKET || 'wapix2020';

const app = express();
var s3 = new aws.S3({
  secretAccessKey: secretAccessKey,
  accessKeyId: accessKeyId,
  Bucket: bucketName,
  region: 'us-east-1'
});

const swaggerOptions = {
    swaggerDefinition: {
        swagger: "2.0",
        components: {},
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
    apis: ['app.js', 'api/models/result.js', 'api/models/user.js', 'api/models/wapix.js',
     'api/routes/user.js', 'api/routes/result.js', 'api/routes/wapix.js'
     ]
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

/* aws multer-s3 */
var upload  = multer({
  storage: multerS3({
      s3: s3,
      bucket: bucketName,
      acl: 'public-read',
      key: function (req, file, cb) {
        cb(null, Date.now().toString())
      }
  })
});
//use by upload form
app.post('/upload', upload.array('upl',1), function (req, res, next) {
  console.log(res);
  res.send("Uploaded!");
}); 


module.exports = app;