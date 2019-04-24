import React from "react";
import ReactDOM from "react-dom";
import Registration from "./registration";
import Welcome from "./welcome";

// import Welcome from "./welcome";
// let elem;
// if (location.pathname == "/welcome") {
//     // user is logged in
//     elem = <Welcome />;
// } else {
//     // user is not logged in
//     elem = <img src="/logo.gif" />;
// }

ReactDOM.render(<Welcome />, document.querySelector("main"));

function RenderAllElements() {
    return (
        <div>
            <Registration />
        </div>
    );
}
