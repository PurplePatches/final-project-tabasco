import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import Login from "./login";

// let userLocation;
//
// if (location.pathname == "/welcome") {
//     // user is logged in
//     userLocation = <Welcome />;
// } else {
//     // user is not logged in
//     userLocation = <Login />;
// }

ReactDOM.render(<Welcome />, document.querySelector("main"));
