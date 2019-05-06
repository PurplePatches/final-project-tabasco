import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './welcome';
import App from './app';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import reducer from './utils/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(
        reduxPromise
    )
));

ReactDOM.render(
    <Start />,
    document.querySelector('main')
);



function Start() {
    const toRender = document.location.pathname === "/welcome" ? <Welcome /> :  <Provider store={store}><App /></Provider>
    return (
         toRender
    );
}
