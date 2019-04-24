import React from "react";
import ReactDOM from "react-dom";

// import Welcome from "./welcome";
// let elem;
// if (location.pathname == "/welcome") {
//     // user is logged in
//     elem = <Welcome />;
// } else {
//     // user is not logged in
//     elem = <img src="/logo.gif" />;
// }

ReactDOM.render(<HelloWorld />, document.querySelector("main"));

function HelloWorld() {
    return <div>Hello, World!</div>;
}
