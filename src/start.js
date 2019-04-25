import React from "react";
import ReactDOM from "react-dom";

import Welcome from "./welcome";
import Bio from "./bio";

let elem;

if (location.pathname == "/welcome") {
    elem = <Welcome />;
} else if (location.pathname == "/bio") {
    elem = <Bio />;
} else {
    elem = HelloWorld();
}
ReactDOM.render(elem, document.querySelector("main"));

function HelloWorld() {
    return <div>Furrrrrrrrrrrrrrrrrrrrrrrrrrylicious!</div>;
}
