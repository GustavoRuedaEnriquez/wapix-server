'use strict'

let app = require('./app');
let mongoose = require('mongoose');
let SocketsUtils = require('../api/utils/sockets');

require('dotenv').config();

let server;
let PORT = process.env.PORT || 3003;

mongoose.connect(process.env.MONGO_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=> {
        console.log("\n\n====> Connected to Mongo database!");
        server = app.listen(PORT,()=>{
            console.log("====> Local Server created in http://127.0.0.1:" + PORT + "" +"\n\n");
        });
        const io = SocketsUtils.configureSockets(server);
    })
    .catch(err => console.log(err));
