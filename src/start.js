import React from "react";
import ReactDOM from "react-dom";

import Welcome from "./welcome";

let elem;

if (location.pathname == "/welcome") {
    elem = <Welcome />;
} else {
    elem = (
        <img
            className="logo"
            src="https://media.giphy.com/media/l0K4kWJir91VEoa1W/source.gif"
        />
    );
}

ReactDOM.render(elem, document.querySelector("main"));
