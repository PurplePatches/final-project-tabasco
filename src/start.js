import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";

let userLocation;

if (location.pathname == "/welcome") {
    userLocation = <Welcome />;
} else {
    userLocation = <App />;
}

ReactDOM.render(userLocation, document.querySelector("main"));
