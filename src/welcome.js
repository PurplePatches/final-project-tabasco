import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Logo from "./logo";
import Login from "./login";

export default function Welcome() {
    return (
        <div id="welcomeMessage">
            <h1>Welcome to Heart On</h1>
            <Logo className="logo" />
            <h3>Tell us who you have an affection erection for!</h3>

            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
}
