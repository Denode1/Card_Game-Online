var express = require('express');

var app = express();

var server = app.listen(3000);
app.use(express.static('public'));
console.log("Server is running..");

var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection', newConnection);

var nr = 0;
function newConnection(socket) {
    console.log('New Connection: ' + socket.id);
    socket.on('play', start);
    socket.on('sendData', function(data) {
        socket.broadcast.emit('receiveData', data);
    });
    socket.on('betting', function(data) {
        socket.broadcast.emit('betting', data);
    });
    socket.on('send', function(cardData) {
        socket.broadcast.emit('send', cardData);
    });
    function start(number) {
        nr += number;
        console.log("Stare: " + nr);
        socket.broadcast.emit('ServerStatus', nr);
        if(number == 1){
            if(nr < 2)
                socket.emit('NeedPlayers', true);
            else 
                socket.broadcast.emit('NeedPlayers', false);
        }
        else if(number == -1){
            if(nr == 1) 
                socket.broadcast.emit('GoTo1', true);
            if(nr < 2)
                socket.broadcast.emit('NeedPlayers', true);
        }
    }
    // io.sockets.emit('play', text)
    //console.log(data);
}