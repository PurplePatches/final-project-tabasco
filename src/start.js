import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Link, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import reducer from './reducers';
import HotOrNot from './hotornot';
import Hot from './hot';
import Not from './not';

const store = createStore(reducer, applyMiddleware(reduxPromise));

const elem = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(elem, document.querySelector('main'));

function App() {
    return (
        <div>
            <HashRouter>
                <div>
                    <Route exact path="/" component={HotOrNot} />
                </div>
            </HashRouter>
        </div>
    );
}
