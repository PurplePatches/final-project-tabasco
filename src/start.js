import React from "react";
import ReactDOM from "react-dom";

import Welcome from "./welcome";
import Registration from "./registration";

let elem;

if (location.pathname == "/welcome") {
    elem = <Welcome />;
} else {
    elem = "Welcome to this hairy social Network, furrrrrrrr!";
}
ReactDOM.render(elem, document.querySelector("main"));

function HelloWorld() {
    return <div>Hello, World!</div>;
}
