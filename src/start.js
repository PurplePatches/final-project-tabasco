import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome.js";
// import App from "./app";
import Logo from "./logo";

let element;

if (location.pathname == "/welcome") {
    element = <Welcome />;
} else {
    element = <Logo />;
}

ReactDOM.render(element, document.querySelector("main"));
