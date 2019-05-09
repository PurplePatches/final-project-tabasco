import React from "react";
import Register from "./register";
import Login from "./login";
import { HashRouter, Route } from "react-router-dom";

export default class Welcome extends React.Component {
    render() {
        return (
            <div className="screenWrapper">
                <div className="flexContainer">
                    <h1>Welcome!</h1>
                    <img className="logo" src="assets/whiteHatsLogo.png" />
                    <HashRouter>
                        <div>
                            <Route exact path="/" component={Register} />
                            <Route path="/login" component={Login} />
                        </div>
                    </HashRouter>
                </div>
            </div>
        );
    }
}
