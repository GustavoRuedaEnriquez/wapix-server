'use strict'

const cors = require('cors');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
var multer = require('multer');
var AWS = require('aws-sdk');
var multerS3 = require('multer-s3');
require('dotenv').config();

var BUCKET_NAME = process.env.BUCKET_NAME || 'wapix2020pae';
var IAM_USER_KEY = process.env.IAM_USER_KEY;
var IAM_USER_SECRET = process.env.IAM_USER_SECRET;

const app = express();
const s3bucket = new AWS.S3({
  accessKeyId: IAM_USER_KEY,
  secretAccessKey: IAM_USER_SECRET,
  bucket: BUCKET_NAME
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
const multerstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'api/uploads')
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop();
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  }
});

const multerstorages3 = multerS3({
  s3: s3bucket,
  bucket: BUCKET_NAME,
  acl: 'public-read',
  key: function (req, file, cb) {
    const ext = file.originalname.split('.').pop();
    cb(null, `uploads/${file.fieldname}-${Date.now()}.${ext}`);
  }
});

const upload = multer({ storage: multerstorages3, fileFilter: (req, file, cb) => {
  const flag = file.mimetype.startsWith('image');
  cb(null, flag);
} });

//use by upload form
app.post('/', upload.single('image'), (req, res) => {
  res.send("Uploaded!");
}); 


module.exports = app;