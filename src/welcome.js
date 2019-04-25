import React from "react";
import { HashRouter, Route } from "react-router-dom";

import Registration from "./registration";
import Login from "./login";

export default class Welcome extends React.Component {
    render() {
        return (
            <div className="welcome">
                <div className="logo">My social Network</div>
                <HashRouter>
                    <div>
                        <Route exact path="/" component={Registration} />
                        <Route path="/login" component={Login} />
                    </div>
                </HashRouter>
            </div>
        );
    }
}
