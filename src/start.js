import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";

let userLocation;

if (location.pathname == "/welcome") {
    // user is not logged in
    userLocation = <Welcome />;
} else {
    // user is logged in
    userLocation = <div>USER IS LOGGED IN</div>;
}

ReactDOM.render(userLocation, document.querySelector("main"));
