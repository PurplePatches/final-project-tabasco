import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import Login from "./login";

// let elem;
//
// if (location.pathname == "/welcome") {
//     // user is logged in
//     elem = <Welcome />;
// } else {
//     // user is not logged in
//     elem = <Login />;
// }

ReactDOM.render(<Login />, document.querySelector("main"));
