'use strict'

let app = require('./app');
let mongoose = require('mongoose');
let socketIO = require('socket.io');
const { WapixGame } = require('./utils/wapixGame');

require('dotenv').config();

let server;
let PORT = process.env.PORT || 3003;

let temporalWapix = 'temporal';

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
        io.on('connection', socket => {
            console.log(`Socket connection with client established.`);

            socket.on('wapix-start-game', (wapixId) => {
                socket.join(wapixId);
                console.log(`Client has joined to room: ${wapixId}`);
                console.log(`A game wapix has been started: ${wapixId}\n\n`);
            });

            socket.on('wapix-connect-player', (player) => {
                socket.join(player.hostId);
                console.log(`A player has joined: ${player.username}\n\n`);
                socket.to(player.hostId).emit('wapix-send-player', player);
            });

        });
    })
    .catch(err => console.log(err));

    