const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, { origins: 'localhost:8080 yourfunkychickenapp.herokuapp.com:*' });
const compression = require('compression');

app.use(compression());

if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

server.listen(8080, function() {
    console.log("I'm listening.");
});

io.on('connection', socket => {
    console.log(`socket with the id ${socket.id} is now connected`);

    socket.emit('hey', {
        chicken: 'funky'
    });

    socket.on('yo', data => console.log(data));

    socket.broadcast.emit('yo yo!');
    io.sockets.emit('newConnector', 'another one!');

    console.log(
        io.sockets.sockets
    )

    socket.on('disconnect', () => {
        console.log(`socket with the id ${socket.id} is now disconnected`);
    });
});
