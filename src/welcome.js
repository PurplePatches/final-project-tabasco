import React from "react";
import Register from "./register";
import Login from "./login";
import { HashRouter, Route } from "react-router-dom";

export default class Welcome extends React.Component {
    render() {
        return (
            <div id="welcome">
                <h1>Welcome!</h1>
                <img src="assets/image-wireframe.png" />
                <HashRouter>
                    <div>
                        <Route exact path="/" component={Register} />
                        <Route path="/login" component={Login} />
                    </div>
                </HashRouter>
            </div>
        );
    }
}
