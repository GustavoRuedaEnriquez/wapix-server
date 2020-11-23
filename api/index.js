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
            console.log(`Client connected`);

            socket.on('wapix-connect-player', (player) => {
                let newPlayer = temporalWapix.newPlayer(player.username, player.hostId);
                temporalWapix.addPlayer(newPlayer);
                console.log(temporalWapix);
                console.log(`A player has joined: ${JSON.stringify(player)}\n\n`);
                io.emit('send-name', player);
            });

            socket.on('wapix-start-game', (wapixId) => {
                temporalWapix = new WapixGame(wapixId);
                console.log(temporalWapix);
                console.log(`A game wapix has been started: ${wapixId}\n\n`);
            });

            

        });
    })
    .catch(err => console.log(err));

    