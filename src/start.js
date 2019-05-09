import React from "react";
import ReactDOM from "react-dom";
import * as io from "socket.io-client";
import { getSocket } from "./socket";

import Welcome from "./welcome";
import App from "./app";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxPromise from "redux-promise";

const socket = io.connect();

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

socket.on("hey", data => {
    console.log(data);
});

let elem;

if (location.pathname == "/welcome") {
    elem = <Welcome />;
} else {
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(elem, document.querySelector("main"));
