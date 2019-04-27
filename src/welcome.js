import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";
export default function Welcome() {
    return (
        <section className="project">
            <h2>
                Welcome to Bearbook, the social network for bears and their
                ursine lovers friend
            </h2>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </section>
    );
}
