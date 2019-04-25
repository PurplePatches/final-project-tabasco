import React from "react";

import { HashRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";

export default class Welcome extends React.Component {
    render() {
        return (
            <div>
                <img
                    className="logo"
                    src="https://media.giphy.com/media/l0K4kWJir91VEoa1W/source.gif"
                />
                <h1>SOCIAL NETWORK WELCOME</h1>
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
