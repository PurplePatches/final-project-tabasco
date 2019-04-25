import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './welcome';
import Main from './main';

ReactDOM.render(
    <Start />,
    document.querySelector('main')
);



function Start() {
    const toRender = document.location.pathname === "/welcome" ? <Welcome /> : <Main />
    return (
         toRender
    );
}
