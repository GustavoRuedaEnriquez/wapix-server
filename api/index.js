'use strict'

let app = require('./app');
let mongoose = require('mongoose');
let socketIO = require('socket.io');

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

        /* socket.io */
        const io = socketIO(server, {
            cors : {
                origin : 'http://localhost:4200',
                methods : ['GET', 'POST', 'PATCH', 'DELETE'],
                allowedHeaders : [],
                credentials : true
            }
        });
    
        io.on('connection', function(data) {
            console.log(`Client connected`);
        });
    
        io.on('player-joined', function(data) {
            console.log(`User connected to Wapix ${data.wapixId}: ${data.username}`);
        });
    
    })
    .catch(err => console.log(err));

    