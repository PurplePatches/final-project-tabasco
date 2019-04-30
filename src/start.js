import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome.js";
import App from "./app.js";

let element;

if (location.pathname == "/") {
    element = <App />;
} else if (location.pathname == "/welcome") {
    element = <Welcome />;
}

ReactDOM.render(element, document.querySelector("main"));
