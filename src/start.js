import React from "react";
import ReactDOM from "react-dom";
import * as io from "socket.io-client";
import { init } from "./socket";

import Welcome from "./welcome";
import App from "./app";

const socket = io.connect();

socket.on("hey", data => {
    console.log(data);
});

let elem;

if (location.pathname == "/welcome") {
    elem = <Welcome />;
} else {
    elem = <App />;
}

ReactDOM.render(elem, document.querySelector("main"));
