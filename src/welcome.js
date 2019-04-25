import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Logo from "./logo";
import Login from "./login";

export default function Welcome() {
    return (
        <div id="welcomeMessage">
            <h1>Welcome to my Social Network</h1>
            <Logo className="logo" />
            <h3>
                This is the place to be if you want to meet like-minded folk!
            </h3>

            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
}
