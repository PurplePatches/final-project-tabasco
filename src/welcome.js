import React from "react";
import { HashRouter, Route } from "react-router-dom";

import Register from "./register";
import Login from "./login";

export default function Welcome() {
    return (
        <div>
            <div className="welcome">
                <img className="logo" src="/logo.png" />
                <h1>Cool title and shit</h1>
            </div>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Register} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
}
