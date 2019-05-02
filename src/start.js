import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";
import { BrowserRouter } from "react-router-dom";

let elem;
if (location.pathname == "/welcome") {
    elem = <Welcome />;
} else {
    elem = (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
}
ReactDOM.render(elem, document.querySelector("main"));
