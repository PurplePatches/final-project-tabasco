import React from 'react';
import ReactDOM from 'react-dom';
import {init} from './socket';

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(
        reduxPromise
    )
));

let elem;

if (location.pathname == '/welcome') {
    elem = <Welcome />;
} else {
    elem = <Provider store={store}><App /></Provider>;
    init(store);
}

ReactDOM.render(
    elem,
    document.querySelector('main')
);

function HelloWorld() {
    return (
        <div>Hello, World!</div>
    );
}
