import React from 'react';
import ReactDOM from 'react-dom';
import * as io from 'socket.io-client';

const socket = io.connect();

socket.on('hey', data => {
    console.log(data);
    socket.emit('yo', 'cute bunny');
});

ReactDOM.render(
    <HelloWorld />,
    document.querySelector('main')
);

function HelloWorld() {
    return (
        <div>Hello, World!</div>
    );
}
