import React from "react";

import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";

export default class Welcome extends React.Component {
    render() {
        return (
            <div id="welcome">
                <div className="logo">
                    <p className="logoname">CONECT</p>
                </div>
                <div>
                    <HashRouter>
                        <div id="boxregister">
                            <Route exact path="/" component={Registration} />
                            <Route path="/login" component={Login} />
                        </div>
                    </HashRouter>
                </div>
            </div>
        );
    }
}
