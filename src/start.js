import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './welcome';
import App from './app';

ReactDOM.render(
    <Start />,
    document.querySelector('main')
);



function Start() {
    const toRender = document.location.pathname === "/welcome" ? <Welcome /> : <App />
    return (
         toRender
    );
}
