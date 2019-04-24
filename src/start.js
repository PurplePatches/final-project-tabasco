import React from "react";
import ReactDOM from "react-dom";

import Welcome from "./welcome";

let elem;

if (location.pathname == "/welcome") {
    elem = <Welcome />;
} else {
    elem = <div>My Social Network</div>;
}

ReactDOM.render(elem, document.querySelector("main"));
