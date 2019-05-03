import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome.js";
import App from "./app.js";

let element;

if (location.pathname == "/welcome") {
    element = <Welcome />;
} else {
    element = <App />;
}

ReactDOM.render(element, document.querySelector("main"));
