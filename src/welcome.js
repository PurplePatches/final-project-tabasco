import React from "react";

import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";

export default class Welcome extends React.Component {
    render() {
        return (
            <div>
                <img className="logo" src="et.jpg" />
                <h1>SPACED</h1>
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
