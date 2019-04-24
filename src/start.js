import React from "react";
import ReactDOM from "react-dom";

import Welcome from "./welcome";

let elem;

if (location.pathname == "/welcome") {
    elem = <Welcome />;
} else {
    elem = <div> Hello there darling!!! </div>;
}

ReactDOM.render(elem, document.querySelector("main"));
