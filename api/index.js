'use strict'

let app = require('./app');
let mongoose = require('mongoose');

require('dotenv').config();

let PORT = process.env.PORT || 3003;

mongoose.connect(process.env.MONGO_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>{
        console.log("\n\n====> Connected to Mongo database!");
        
        app.listen(PORT,()=>{
            console.log("====> Local Server created in http://127.0.0.1:" + PORT + "" +"\n\n");
        });
    })
    .catch(err => console.log(err));