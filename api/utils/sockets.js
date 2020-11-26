const socketIO = require('socket.io');

const WapixController = require('../controllers/wapix');

const ResultsController = require('../controllers/result');


function configureSockets(server) {
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
        /* Enable wapix */
        socket.on('wapix-enable-game', (wapixId) => {
            socket.join(wapixId);
            //console.log(`A game wapix has been enabled: ${wapixId}\n`);
        });
        /* A player connects to a wapix */
        socket.on('wapix-connect-player', (player) => {
            socket.join(player.hostId);
            //console.log(`A player has joined: ${player.username}`);
            socket.to(player.hostId).emit('wapix-send-player', player);
        });
        /* Clients answers a question */
        socket.on('wapix-client-has-answered', (wapixId) => {
            socket.to(wapixId).emit('wapix-update-answers-number');
        });
        /* Host starts the wapix */
        socket.on('wapix-host-start-game', (data) => {
            socket.to(data.wapixId).emit('wapix-start-game', data.resultId);
        });
        /* Host shows a wapix question */
        socket.on('wapix-host-show-question', (data) => {
            socket.to(data.wapixId).emit('wapix-send-question', data);
        });
        /* Host shows a wapix question */
        socket.on('wapix-host-next-question', (wapixId) => {
            socket.to(wapixId).emit('wapix-next-question');
        });
        /* Question's time runs out */
        socket.on('wapix-timeout', (wapixId) => {
            socket.to(wapixId).emit('wapix-question-timeout');
        });
    });

    return io;    
}


module.exports = {configureSockets}